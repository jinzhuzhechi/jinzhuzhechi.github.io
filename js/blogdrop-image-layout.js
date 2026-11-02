/* 单张竖图自动按 2/3 宽度显示（BlogDrop 维护） */
(function () {
  function apply() {
    var images = document.querySelectorAll('#board .markdown-body img')
    for (var i = 0; i < images.length; i++) {
      var img = images[i]
      if (!img.naturalWidth || !img.naturalHeight) continue
      if (img.closest('.bd-img-grid')) {
        img.classList.remove('bd-portrait')
        continue
      }
      var parent = img.parentElement
      var onlyBlock = false
      if (parent) {
        // 一张图独占一段/一行（前后即使有文字，只要这一段里没有别的图片）也算
        onlyBlock = !!parent.classList && parent.classList.contains('markdown-body')
          ? true
          : parent.querySelectorAll('img').length === 1
      }
      img.classList.toggle('bd-portrait', !!onlyBlock && img.naturalHeight > img.naturalWidth)
    }
  }
  document.addEventListener('DOMContentLoaded', apply)
  window.addEventListener('load', apply)
  document.addEventListener('load', apply, true)
  window.addEventListener('resize', apply)
})()
