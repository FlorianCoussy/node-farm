module.exports = (template, data) => {
  const placeholders = Array.from(template.matchAll(/{\w*}/g));

  return data.map((product) => {
    let recordView = template;
    for ([placeholder] of placeholders) {
      const placeholderKey = placeholder.substring(1, placeholder.length - 1);

      if (placeholderKey === "notOrganic") {
        recordView = recordView.replace(placeholder, product["organic"] ? "" : "not-organic");
      } else {
        recordView = recordView.replace(placeholder, product[placeholderKey]);
      }
    }
    return recordView;
  });
}
