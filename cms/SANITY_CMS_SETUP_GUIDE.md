# Sanity CMS Setup Guide for TOACC Gallery

This guide will help you set up Sanity CMS with proper role-based access control for your gallery staff and super admin.

## 📋 Prerequisites

- A Sanity.io account (sign up at https://www.sanity.io/)
- Access to your Sanity project
- Email addresses for your team members

## 🚀 Initial Setup

### 1. Create Sanity Project

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Click "Create project"
3. Name: "TOACC Gallery CMS"
4. Select a dataset name (default: "production")
5. Click "Create"

### 2. Install and Configure

```bash
cd cms
pnpm install
```

### 3. Link Your Project

```bash
# Login to Sanity
npx sanity login

# Initialize the project (if not already linked)
npx sanity init --project-id YOUR_PROJECT_ID --dataset production
```

### 4. Set Environment Variables

Create a `.env` file in the `cms/` directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

**Get your Project ID:**
- Go to Sanity Manage → Your Project → Settings → API → Project ID

**Get your API Token:**
- Go to Sanity Manage → Your Project → API → Tokens
- Click "Add API token"
- Name: "CMS Editor Token"
- Select "Editor" permissions
- Copy the token

### 5. Deploy Sanity Studio

```bash
pnpm deploy
```

This will deploy your CMS to `https://your-project.sanity.studio`

## 👥 Setting Up User Roles and Permissions

### Step 1: Add Team Members

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project
3. Navigate to **Members** in the sidebar
4. Click **"Invite member"**

### Step 2: Invite Gallery Staff

**For Adeola (`adeola@tundeodunladearts.com`):**
1. Email: `adeola@tundeodunladearts.com`
2. Role: **Editor** (allows create, read, update, but not delete)
3. Permissions: 
   - ✅ Can create/read/update artworks
   - ✅ Can create/read/update exhibitions
   - ✅ Can create/read/update gallery images
   - ✅ Can create/read/update shop items
   - ❌ Cannot delete content (only Super Admin can delete)
   - ❌ Cannot access Press content
   - ❌ Cannot modify site configuration

**For Elizabeth (`elizabeth@tundeodunladearts.com`):**
1. Email: `elizabeth@tundeodunladearts.com`
2. Role: **Editor** (same permissions as Adeola)
3. Same permissions as above

**Important:** Both Adeola and Elizabeth should only access the **Gallery Staff CMS** at:
- `https://your-project.sanity.studio/admin`

### Step 3: Invite Super Admin

**For Tunde (`tunde@tundeodunladearts.com`):**
1. Email: `tunde@tundeodunladearts.com`
2. Role: **Administrator** (full access)
3. Permissions:
   - ✅ Full access to all content types
   - ✅ Can manage artworks, exhibitions, gallery, shop
   - ✅ Can manage Press content
   - ✅ Can modify site configuration
   - ✅ Can delete content
   - ✅ Can manage team members
   - ✅ Can access both CMS panels:
     - Gallery Staff CMS: `https://your-project.sanity.studio/admin`
     - Press CMS: `https://your-project.sanity.studio/press-admin`

## 🔐 Role-Based Access Configuration

### Sanity Access Control

Sanity manages permissions at the document level. To implement role-based access:

1. **Go to Sanity Manage → Your Project → Settings → API**
2. **Create Custom Roles** (if needed):
   - "Gallery Staff" - Can edit artworks, exhibitions, artists
   - "Press Editor" - Can edit press posts only
   - "Super Admin" - Full access

3. **Configure Document-Level Permissions** in `sanity.config.ts`:

The current configuration already sets up two separate CMS panels:
- **Gallery Staff CMS** (`/admin`) - For gallery staff
- **Press CMS** (`/press-admin`) - For press content

### Custom Access Control Plugin

Create `cms/plugins/accessControl.ts`:

```typescript
import { definePlugin } from 'sanity';

export const accessControl = definePlugin({
  name: 'access-control',
  document: {
    actions: (prev, context) => {
      const { currentUser } = context;
      const email = currentUser?.email || '';
      
      // Gallery staff (Adeola and Elizabeth) cannot delete
      if (email === 'adeola@tundeodunladearts.com' || email === 'elizabeth@tundeodunladearts.com') {
        return prev.filter(action => action.action !== 'delete');
      }
      
      // Super admin (Tunde) has full access
      if (email === 'tunde@tundeodunladearts.com') {
        return prev;
      }
      
      return prev;
    },
  },
});
```

Then add it to `sanity.config.ts`:

```typescript
import { accessControl } from './plugins/accessControl';

export default defineConfig([
  {
    // ... your config
    plugins: [
      deskTool(),
      visionTool(),
      structureTool({...}),
      accessControl(), // Add this
    ],
  },
]);
```

## 📝 Content Management Capabilities

### Gallery Staff (Adeola & Elizabeth) Can:

#### Gallery Page:
- ✅ Upload images to gallery
- ✅ Remove images from gallery
- ✅ Reorder gallery images
- ✅ Add image metadata (title, description, alt text)
- ✅ Tag images for filtering

#### Shop Page:
- ✅ Add new artworks to shop
- ✅ Update artwork details:
  - Title, description, images
  - Price (NGN)
  - Availability status
  - Tags and categories
  - Dimensions and medium
  - Year
- ✅ Remove artworks from shop
- ✅ Mark items as featured
- ✅ Set artwork availability (Available, Sold, On Hold, Not for Sale)

#### Exhibition Page:
- ✅ Create new exhibitions
- ✅ Update exhibition details:
  - Title, subtitle, description
  - Start date, end date, opening time
  - Venue name and address
  - Category and type (Solo, Group, Workshop, etc.)
  - Tags and badges
  - Entry price
  - Hero image and gallery images
  - Featured artworks
  - Status (Upcoming, Current, Past)
- ✅ Add/remove exhibition images
- ✅ Link artworks to exhibitions

#### Artists:
- ✅ Add new artist profiles
- ✅ Update artist information
- ✅ Link artists to artworks and exhibitions

#### Cannot:
- ❌ Delete content (only Super Admin can)
- ❌ Access Press content
- ❌ Modify site configuration
- ❌ Manage team members

### Super Admin (Tunde) Can:

#### Everything Gallery Staff Can Do, Plus:
- ✅ Delete any content
- ✅ Manage Press page:
  - Create press posts
  - Update press articles
  - Add press images
  - Manage press categories and tags
  - Set featured press posts
- ✅ Modify site configuration
- ✅ Manage team members and permissions
- ✅ Access all CMS panels

## 🖼️ Image Upload Guidelines

### Gallery Images:
- **Recommended size:** 1920x1080px or larger
- **Format:** JPG or PNG
- **File size:** Under 5MB per image
- **Naming:** Descriptive names (e.g., "Gallery_Exhibition_2024_01.jpg")

### Artwork Images:
- **Recommended size:** 2000x2000px or larger
- **Format:** JPG or PNG
- **File size:** Under 10MB per image
- **Multiple images:** Can upload multiple views of each artwork

### Exhibition Hero Images:
- **Recommended size:** 1920x1080px (16:9 aspect ratio)
- **Format:** JPG
- **File size:** Under 5MB

## 🔄 Workflow

### Adding New Artwork to Shop:

1. Login to CMS: `https://your-project.sanity.studio/admin`
2. Navigate to **Artworks**
3. Click **Create new artwork**
4. Fill in details:
   - Title
   - Artist (link to existing artist or create new)
   - Upload images (multiple views)
   - Set price (NGN)
   - Add description, medium, dimensions
   - Set availability
   - Add tags and category
   - Mark as featured (if applicable)
5. Click **Publish**

### Creating New Exhibition:

1. Navigate to **Exhibitions**
2. Click **Create new exhibition**
3. Fill in details:
   - Title and subtitle
   - Start date and end date
   - Opening time
   - Venue name and address
   - Upload hero image
   - Upload gallery images
   - Write description
   - Select type (Solo, Group, Workshop, etc.)
   - Add category, tags, and badge
   - Set entry price (0 for free)
   - Link featured artworks
   - Set status (Upcoming/Current/Past)
4. Click **Publish**

### Managing Press Content (Super Admin Only):

1. Login to Press CMS: `https://your-project.sanity.studio/press-admin`
2. Navigate to **Press Posts**
3. Create new post or edit existing
4. Fill in:
   - Title
   - Cover image
   - Excerpt (short summary)
   - Body content (rich text with images)
   - Category, tags, publication, author
   - Publish date
5. Click **Publish**

## 🧪 Testing the Setup

1. **Test Gallery Staff Access:**
   - Login as Adeola or Elizabeth
   - Verify you can see Artworks, Exhibitions, Artists
   - Verify you cannot see Press Posts
   - Verify delete buttons are disabled/hidden

2. **Test Super Admin Access:**
   - Login as Tunde
   - Verify access to both `/admin` and `/press-admin`
   - Verify full permissions including delete

3. **Test Content Updates:**
   - Create a test artwork
   - Verify it appears on the shop page
   - Update the artwork
   - Verify changes reflect on the website

## 🔧 Troubleshooting

### Cannot Login:
- Verify email address matches invitation
- Check spam folder for invitation email
- Ensure you're using the correct CMS URL

### Cannot See Certain Content:
- Verify your role has proper permissions
- Check if content is published (draft content may not be visible)
- Ensure you're in the correct CMS panel (`/admin` vs `/press-admin`)

### Images Not Uploading:
- Check file size (must be under limit)
- Verify file format is supported (JPG, PNG)
- Check internet connection

### Changes Not Reflecting on Website:
- Ensure content is **Published** (not just saved as draft)
- Check if website is fetching from Sanity (verify environment variables)
- Clear website cache

## 📚 Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Access Control](https://www.sanity.io/docs/access-control)
- [Sanity Studio Configuration](https://www.sanity.io/docs/studio-configuration)

## ✅ Setup Checklist

- [ ] Sanity project created
- [ ] CMS configured and deployed
- [ ] Adeola invited as Editor
- [ ] Elizabeth invited as Editor
- [ ] Tunde invited as Administrator
- [ ] Environment variables configured
- [ ] Frontend connected to Sanity (verify API routes work)
- [ ] Test content created and published
- [ ] Gallery staff can upload images
- [ ] Gallery staff can manage shop items
- [ ] Gallery staff can manage exhibitions
- [ ] Super admin can access all features
- [ ] Press CMS accessible to super admin only

---

**Need Help?** Contact your developer or refer to the Sanity documentation.

