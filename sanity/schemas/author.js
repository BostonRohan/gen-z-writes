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
      type: "string",
      title: "Bio",
      validation: (Rule) => Rule.required().min(10).max(5000),
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
  ],
};

export default author;
