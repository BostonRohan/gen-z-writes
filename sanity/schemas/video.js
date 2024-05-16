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
      title: "Url",
      name: "url",
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
      validation: (Rule) =>
        Rule.unique()
          .min(1)
          .max(5)
          .custom((tags) => {
            for (let i = 0; i < tags.length; i++) {
              //remove non alphanumerics except for spaces, hyphens and apostrophes
              if (/[^a-zA-Z-\s']+/.test(tags[i])) {
                return {
                  message:
                    "Tag should only contain letters, hyphens and apostrophes",
                };
              }
              if (tags[i].split(" ").length > 2) {
                return { message: "Tag should not be longer than two words" };
              }

              //if there are two words in a tag, make sure both are capitalized
              if (tags[i].split(" ").length > 1) {
                if (
                  !/[A-Z]/.test(tags[i].split(" ")[0][0]) ||
                  !/[A-Z]/.test(tags[i].split(" ")[1][0])
                ) {
                  return { message: "All words in a tag must be capitalized" };
                }
              }
              if (!/[A-Z]/.test(tags[i][0])) {
                return { message: "Tag should be capitalized" };
              }
            }
            return true;
          }),
      options: {
        layout: "tags",
      },
    },
    {
      name: "author",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          title: "Reference",
          name: "ref",
          type: "reference",
          to: [{ type: "author" }],
        },
      ],
    },
    {
      name: "views",
      type: "number",
      initialValue: 0,
      readOnly: true,
    },
    {
      name: "videoDuration",
      type: "string",
      initialValue: "0:00",
      readOnly: true,
    },
  ],
};

export default video;
