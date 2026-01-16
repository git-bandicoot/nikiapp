const {onDocumentWritten} = require("firebase-functions/v2/firestore");
const {setGlobalOptions} = require("firebase-functions/v2");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();

setGlobalOptions({region: "us-central1"});

exports.syncSubscriberToMailbluster = onDocumentWritten(
    {
      document: "subscribers/{email}",
      secrets: ["MAILBLUSTER_API_KEY"],
    },
    async (event) => {
      const after = event.data.after;

      if (!after.exists) {
        return;
      }

      const data = after.data();

      if (!data.email || !data.displayName) {
        logger.info("Missing email or displayName, skipping");
        return;
      }

      if (data.mailblusterSyncedAt) {
        logger.info("Already synced, skipping");
        return;
      }

      const email = String(data.email).toLowerCase();
      const displayName = String(data.displayName).trim().slice(0, 25);

      const payload = {
        email: email,
        firstName: displayName,
        subscribed: true,
        doubleOptIn: true,
        overrideExisting: true,
        tags: ["NIKI"],
        fields: {
          displayName: displayName,
          source: "TopFold Subscribe",
        },
      };

      try {
        const res = await fetch(
            "https://api.mailbluster.com/api/leads",
            {
              method: "POST",
              headers: {
                "Authorization": process.env.MAILBLUSTER_API_KEY,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            },
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error("Mailbluster error: " + text);
        }

        await after.ref.set(
            {
              mailblusterSyncedAt:
            admin.firestore.FieldValue.serverTimestamp(),
              displayName: displayName,
            },
            {merge: true},
        );

        logger.info("Mailbluster sync successful", {email: email});
      } catch (err) {
        logger.error("Mailbluster sync failed", err);
        throw err;
      }
    },
);
