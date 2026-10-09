// File: seed.ts
// Folder: scripts
// Description: Terminal script to inject active users, categories, and sample posts into the database.

import { db } from "../src/lib/db";
import bcrypt from "bcryptjs";

// Helper to generate a URL-friendly slug
function generateSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

// Helper to generate realistic Tiptap JSON content for the rich text editor
function generateTiptapContent(title: string) {
  return JSON.stringify({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: `This is the comprehensive guide to ${title}. In this article, we will explore the core concepts, practical applications, and industry best practices to help you master this topic.` }]
      },
      {
        type: "heading",
        attrs: { level: 2, textAlign: "left" },
        content: [{ type: "text", text: "Why This Matters Today" }]
      },
      {
        type: "paragraph",
        content: [{ type: "text", text: "The landscape is constantly evolving. Staying ahead requires not just understanding the theory, but also knowing how to implement these strategies effectively in real-world scenarios. Here are the key takeaways you should keep in mind:" }]
      },
      {
        type: "bulletList",
        content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Always prioritize performance and user experience." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Keep your systems secure and up to date." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Scalability should be built into the architecture from day one." }] }] }
        ]
      },
      {
        type: "paragraph",
        content: [{ type: "text", text: "By following these principles, teams can ensure their platforms remain robust, maintainable, and prepared for future growth." }]
      }
    ]
  });
}

async function main() {
  console.log("🌱 Starting database seeding...");

  const passwordHash = await bcrypt.hash("password123", 12);

  // --- 1. SEED 4 VERIFIED USERS ---
  const testUsers = [
    { name: "Super Admin", email: "admin@example.com", role: "SUPERADMIN", status: "ACTIVE" },
    { name: "Lead Editor", email: "editor@example.com", role: "EDITOR", status: "ACTIVE" },
    { name: "Content Writer", email: "writer@example.com", role: "ADMIN", status: "ACTIVE" },
    { name: "Quality Reviewer", email: "reviewer@example.com", role: "REVIEWER", status: "ACTIVE" }
  ];

  const createdUsers = [];
  for (const u of testUsers) {
    const user = await db.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        name: u.name,
        email: u.email,
        passwordHash,
        role: u.role as any,
        status: u.status as any,
        emailVerifiedAt: new Date(), 
      },
    });
    createdUsers.push(user);
    console.log(`✅ Created User: ${user.name}`);
  }

  // --- 2. SEED 6 CATEGORIES ---
  const categoriesData = [
    { name: "Web Development", desc: "Tutorials and guides on modern web architecture." },
    { name: "Digital Marketing", desc: "Strategies for SEO, content, and growth." },
    { name: "UI/UX Design", desc: "Designing intuitive and beautiful user interfaces." },
    { name: "Cloud Infrastructure", desc: "Scaling apps with AWS, Cloudflare, and Vercel." },
    { name: "Startup Insights", desc: "Lessons learned from building tech businesses." },
    { name: "Productivity", desc: "Tools and workflows to ship faster." }
  ];

  const createdCategories = [];
  for (const cat of categoriesData) {
    const slug = generateSlug(cat.name);
    const category = await db.category.upsert({
      where: { slug },
      update: {},
      create: { name: cat.name, slug, description: cat.desc },
    });
    createdCategories.push(category);
    console.log(`✅ Created Category: ${category.name}`);
  }

  // --- 3. SEED 18 POSTS (3 per category) ---
  console.log("📝 Generating 18 sample posts...");
  
  // We use the first editor as the default author
  const authorId = createdUsers[1].id; 
  
  let postCounter = 0;

  for (const category of createdCategories) {
    for (let i = 1; i <= 3; i++) {
      postCounter++;
      const title = `The Ultimate Guide to ${category.name} - Part ${i}`;
      const slug = generateSlug(title);
      
      // Stagger the published dates so they aren't all posted at the exact same millisecond
      const publishedDate = new Date();
      publishedDate.setDate(publishedDate.getDate() - postCounter); 

      await db.post.upsert({
        where: { slug },
        update: {},
        create: {
          title,
          slug,
          content: generateTiptapContent(title),
          categoryId: category.id,
          authorId: authorId,
          status: "PUBLISHED" as any,
          metaTitle: `${title} | Professional Insights`,
          metaDescription: `Discover the best practices, tools, and strategies for mastering ${category.name.toLowerCase()} in this comprehensive breakdown.`,
          // Using picsum.photos with the slug as a seed guarantees a consistent, high-quality placeholder image for each unique post
          featuredImage: `https://picsum.photos/seed/${slug}/1200/600`,
          imageAltText: `Cover image for ${title}`,
          publishedAt: publishedDate,
        }
      });
    }
    console.log(`✅ Created 3 posts for: ${category.name}`);
  }

  console.log("🎉 Seeding complete! Your database is now populated with rich test data.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  });