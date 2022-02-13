const fetchImages = async (searchTerm) => {
    const response = await fetch(url(searchTerm), {
        headers: {
            Authorization:
                '563492ad6f917000010000012b1e23f344b94582a4308ad76282f09e',
        },
    });
    const data = await response.json();
    return data.photos;
};

const url = (searchTerm) =>
    `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=20`;

const displayImages = async () => {
    const searchBox = document.querySelector('input');
    const imageContainer = document.querySelector('.images');
    const note = document.querySelector('.note');

    imageContainer.innerHTML = '';

    note.innerHTML = '<div class="loading">Loading...</div>';

    const images = await fetchImages(searchBox.value);
    if (images.length === 0) {
        note.innerHTML = '<div class="error">No images found</div>';
        searchBox.value = '';
        return;
    }
    const imagesDOM = `${images
        .map((image) => `<img src=${image.src.medium}/>`)
        .join('')}`;
    note.innerHTML = '';
    imageContainer.innerHTML = imagesDOM;
    searchBox.value = '';
};

const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    displayImages();
});
