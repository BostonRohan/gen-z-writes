const author = {
  name: "author",
  type: "document",
  title: "Author",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required().min(3).max(40),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "name",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      name: "bio",
      type: "array",
      of: [{ type: "block" }],
      title: "Bio",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "books",
      type: "array",
      title: "Books",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            {
              title: "Url",
              name: "url",
              type: "string",
            },
            {
              name: "cover",
              type: "image",
              title: "Cover",
            },
          ],
        },
      ],
    },
    {
      name: "image",
      type: "image",
      title: "Image",
    },

    {
      name: "website",
      type: "string",
      title: "Website",
    },

    {
      name: "user",
      type: "object",
      title: "User",
      fields: [
        { name: "id", type: "string", title: "Id" },
        {
          title: "Emails",
          name: "emails",
          type: "array",
          of: [{ type: "string" }],
        },
        { name: "emailVerified", type: "datetime", title: "Email Verified" },
      ],
    },
    {
      title: "Videos",
      name: "videos",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "video" }],
        },
      ],
    },
  ],
};

export default author;
