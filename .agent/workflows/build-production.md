---
description: How to generate a signed Android APK/AAB for production
---

# Production Build Workflow

This workflow guides you through generating a signed Android build (APK or AAB) for the Hospital-Mobile application.

### Prerequisites
- [x] Ensure `eas-cli` is installed (`npm install -g eas-cli`)
- [x] Ensure you are logged into your Expo account (`eas login`)

### Steps

// turbo
1. **Synchronize Dependencies**
   Ensure all package versions match the target Expo SDK and that all native plugins are configured correctly.
   ```bash
   npx expo install --fix
   ```

2. **Trigger Signed Build**
   Choose the profile based on your needs:

   - **For Testing (APK)**:
     ```bash
     npx eas build -p android --profile preview
     ```

   - **For Play Store (AAB)**:
     ```bash
     npx eas build -p android --profile production
     ```

3. **Monitor and Download**
   Follow the link provided in the terminal to monitor the build on the EAS dashboard. Once complete, you can download the signed artifact directly from the dashboard or the terminal link.

### Troubleshooting
- **Gradle Errors**: If you encounter "AAPT2 resource compilation" errors, verify that no images in the `assets/` folder are unusually large (keep them < 1MB).
- **Signing Errors**: EAS handles signing automatically. If it fails, run `eas credentials` to reset or update your Android keystore.
