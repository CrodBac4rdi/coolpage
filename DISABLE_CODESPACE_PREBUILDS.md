# How to Disable Codespace Prebuilds

If you're experiencing Codespace prebuilds running after every push, you can disable them in your GitHub repository settings.

## Steps to Disable Codespace Prebuilds:

1. **Go to your repository on GitHub**: https://github.com/CrodBac4rdi/coolpage

2. **Click on Settings** (in the repository navigation bar)

3. **In the left sidebar, find and click on "Codespaces"**

4. **Look for the "Prebuild configuration" section**

5. **You'll see options for:**
   - Prebuild triggers (likely set to "Every push")
   - Prebuild regions
   - Active prebuilds

6. **To disable prebuilds completely:**
   - Click on the three dots (⋮) next to your prebuild configuration
   - Select "Delete" or "Disable"

7. **Alternative - Change trigger frequency:**
   - Instead of disabling completely, you can change the trigger from "Every push" to:
     - "On configuration change" (only when devcontainer.json changes)
     - "Scheduled" (e.g., daily or weekly)
     - "Manual" (only when you manually trigger)

## Why Prebuilds Might Be Running:

Codespace prebuilds are designed to speed up Codespace creation by pre-building your development environment. However, they can consume GitHub Actions minutes and may not be necessary for smaller projects.

## Note:
Since there's no `.devcontainer` folder in your repository, the prebuilds are likely using default configurations. Disabling them should not affect your ability to use Codespaces - it will just mean Codespaces take a bit longer to start up as they'll build on-demand instead of using a prebuild.