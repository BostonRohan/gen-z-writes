const video = {
  name: "video",
  type: "document",
  title: "Video",
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
        source: "title",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      title: "Video URL",
      name: "videoUrl",
      type: "url",
      validation: (Rule) =>
        Rule.required().custom((name) => {
          if (name.startsWith("https://www.youtube.com/")) {
            return true; //only allow youtube vids
          }
          return { message: "Video must be a Youtube video" };
        }),
    },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "video",
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

export default video;
