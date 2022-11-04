export default class MarkupService {
    constructor(reference) {
        this.ref = reference;
    }

    resetMarkup() {
        this.ref.innerHTML = '';
    }
  
    makeCardMarkup(imgList) {
        if (imgList.length === 0) {
            this.resetMarkup();
            return;
        }
        const markup = imgList.map(e => {
                return `
           <div class="photo-card">
           <a class="card-ref" href="${e.largeImageURL}">
            <img class="photo-img" src="${e.webformatURL}" alt="${e.tags}" loading="lazy" width = "400" height="250"/>
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b><br>${e.likes}
            </p>
            <p class="info-item">
              <b>Views</b><br>${e.views}
            </p>
            <p class="info-item">
              <b>Comments</b><br>${e.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b><br>${e.downloads}
            </p>
          </div>
        </div>
`
            })
            .join('');
        this.ref.insertAdjacentHTML('beforeend', markup);
    }
}
