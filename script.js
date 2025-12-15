function search() {
  const query = document.getElementById('searchInput').value.trim();
  if(query === "") {
    alert("اكتب كلمة للبحث أولاً!");
    return;
  }
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  window.open(url, "_blank");
}
