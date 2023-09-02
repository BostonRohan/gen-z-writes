const writtenSubmissions = {
  name: "writtenSubmissions",
  type: "document",
  title: "Written Submissions",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
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
      name: "body",
      type: "string",
      title: "body",
      validation: (Rule) => Rule.required().min(10).max(10000),
    },
    {
      name: "writtenSubmissions",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          title: "Owner",
          name: "owner",
          type: "reference",
          to: [{ type: "author" }],
        },
      ],
    },
  ],
};

export default writtenSubmissions;
