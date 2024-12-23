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
      title: "Publication",
      name: "publication",
      type: "url",
    },

    {
      name: "bio",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "External link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                  {
                    title: "Open in new tab",
                    name: "blank",
                    type: "boolean",
                  },
                ],
              },
              {
                name: "internalLink",
                type: "object",
                title: "Internal link",
                fields: [
                  {
                    name: "reference",
                    type: "reference",
                    title: "Reference",
                    to: [{ type: "writtenSubmissions" }],
                  },
                ],
              },
            ],
          },
        },
      ],
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
      name: "socials",
      type: "object",
      title: "Socials",
      fields: [
        { name: "website", type: "string", title: "Website" },
        { name: "instagram", type: "string", title: "Instagram" },
      ],
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
