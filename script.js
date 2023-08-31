// Get the Data of Categories. 
const handleCategory = async () => {
  const res = await fetch(`
    https://openapi.programming-hero.com/api/news/categories
    `)
  const data = await res.json();
  const trimData = data.data.news_category.slice(0, 3);
  trimData.forEach(news => {
    const tabContainer = document.getElementById('tab-container');
    const div = document.createElement('div')
    div.innerHTML = `
    <a onclick ='handleNews("${news.category_id}")' class="tab">${news.category_name}</a>
    `
    tabContainer.appendChild(div);
  })

}
// Get the Data of News according to Categories.
const handleNews = async (category_id, isSeeMore) => {
  const res = await fetch(` https://openapi.programming-hero.com/api/news/category/${category_id}`)
  const data = await res.json();

  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  let trimData = data.data;

  // Slice the array/ data if See More button not clicked
  if (!isSeeMore) {
    trimData = trimData.slice(0, 3);
  }

  // Sort data based on published_date 
  trimData.sort((a, b) => new Date(b.author.published_date) - new Date(a.author.published_date));


  trimData.forEach((news) => {
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = ` <div class="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="${news?.image_url}"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
        <div class="flex justify-between gap-3">
        <h2 class="card-title">${news?.title.slice(0, 60)}</h2>
        <p class="bg-sky-400  font-medium h-12 p-2 rounded-xl ">
           ${news?.rating.badge}
        </p>
      </div>
      <p> ${news?.details.slice(0, 60)}</p>
       
      <div class="flex justify-between ">
      <div class="flex justify-between gap-2">
        <div>
          <img class=' w-12 h-12 rounded-[50%]' src="${news?.author.img}" alt="" />
        </div>
        <div>
          <p>${news.author.name ? news.author.name : 'Unknown'}</p>
          <p>${news.author.published_date ? news.author.published_date : 'Unknown'}</p>
        </div>
      </div>
      <div class="card-actions">
        <button onclick = "handleModal('${news?._id}')" class="mt-10">Read Full Story...</button>
      </div>
    </div>
        </div>
      </div>`;
    cardContainer.appendChild(cardDiv);


  });

  // Hide the See More Button after show All Data
  // if (isSeeMore && trimData.length > 3) {
  //   const seeMoreBtn = document.getElementById('btn-see-more');
  //   seeMoreBtn.style.display = 'none';
  // }
}

// handle Modal
const handleModal = async (news_id) => {
  const res = await fetch(` https://openapi.programming-hero.com/api/news/${news_id}`)
  const data = await res.json()

  const newsDetail = data.data[0];
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = '';
  const modalDiv = document.createElement('div');
  modalDiv.innerHTML = `
<dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box">
  <img  src="${newsDetail.image_url}" alt="" />
  <div class="flex gap-2 mt-3">
        <div >
          <img class=' w-12 h-12 rounded-[50%]' src="${newsDetail?.author.img}" alt="" />
        </div>
        <div>
          <p>${newsDetail?.author.name}</p>
          <p>${newsDetail?.author.published_date}</p>
        </div>
      </div>
    
    <p class="py-4">${newsDetail.details}</p>
    <div class="modal-action">
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
    `
  modalContainer.appendChild(modalDiv);

  // Show Modal
  const modal = document.getElementById('my_modal_1');
  modal.showModal();
};

// Handle See More Button
const handleSeeMore = (isSeeMore) => {
  handleNews('01', true);
}

handleCategory();
handleNews('01', false);