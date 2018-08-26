self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open("v22").then(function(cache){
      console.log("successful cache the files");
      return cache.addAll([
        "/",
        "/index.html",
        "/bundle.js"
      ])
    }).catch(function(err){
      console.log("fail to load cache: " + err)
    })
  )
})

self.addEventListener("fetch", function(event){
  console.log("start loading cache content...")
  event.respondWith(
    caches.match(event.request).then(function(response){
      console.log("now loading: " + event.request.url)
      return response || fetch(event.request)
    })
  )
})