var editorTools = {
  header: {
    class: Header,
    inlineToolbar: true,
  },
  inlineCode: InlineCode,
  marker: Marker,
  underline: Underline,

  list: {
    class: EditorjsList,
    inlineToolbar: true, // Enable inline tools for lists
  },
  toggle: {
    class: ToggleBlock,
    inlineToolbar: true,
  },
  strikethrough: Strikethrough,
  quote: Quote,
  code: CodeTool,
  chart: ChartBlock,
  delimiter: Delimiter,
  table: Table,
  math: EJLaTeX,
  mermaid: MermaidTool,
  annotation: Annotation,
  warning: Warning,

  attaches: {
    class: AttachesTool,
    config: {
      endpoint: "http://localhost:8040/upload/attaches",
    },
  },

  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: "http://localhost:8040/upload/img",
        byUrl: "http://localhost:8040/upload/img",
      },
      field: "img",
      uploadByFile(file) {
        const formData = new FormData();
        formData.append("img", file);

        return fetch("http://localhost:8040/upload/img", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            return {
              success: 1,
              file: { url: data.url }, // Passe `data.url` an deine API an
            };
          })
          .catch((error) => {
            console.error("Upload failed:", error);
            return { success: 0 };
          });
      },
    },
  },
};
