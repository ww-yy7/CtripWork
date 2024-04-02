// 防止XSS攻击，进行转义
export function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;", // 可选
  };
  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}

// 反转义
export function unescapeHtml(text) {
  const map = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
  };
  return text.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g, function (m) {
    return map[m];
  });
}
