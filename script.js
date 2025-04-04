const loading = `<div class="loading"><img src="./assets/loading.svg" alt="Loading..."></div>`;
function generateTitles() {
    //After click add loading animation
    $('#titles-result').html(loading);
    const topic = $('#topic').val();
    $.ajax({
        url: '/api/generate/title',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ topic }),
        success: (data) => {
            $('#titles-result').html(`
                <h3>Titles & Meta Description:</h3>
                <div class="title-list">
                ${data.titles.map(t => `
                    <details name="faq">
                        <summary>${t.title}</summary>
                        <p data-title="${t.title}">${t.meta_description} <br /><span class="useTitle">Use</span></p>
                    </details>
                `).join('')}
                </div>
            `);
        }
    }).fail(() => alert('Error generating titles'));
}

function generateContent() {
    //After click add loading animation
    $('#content-result').html(loading);
    const topic = $('#finalTitle').val();
    const wordCount = $('#word-count').val();
    $.ajax({
        url: '/api/generate/content',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ topic, wordCount }),
        success: (data) => {
            //   $('#content-result').html(`<h3>Content:</h3><div>${data.content.replace(/\n/g, '<br>')}</div>`);
            $('#content-result').html(`<div><div class="sticky-wraper"><button id="copyPost">Copy Post</button></div>${data.content.replace('```html', '').replace('```', '')}</div>`);
        },
        error: () => {
            alert('Error generating content');
        }
    });
}

function generateKeywords() {
    //After click add loading animation
    $('#keywords-result').html(loading);
    const topic = $('#keywordTitle').val();
    $.ajax({
        url: '/api/generate/keywords',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ topic }),
        success: (data) => {
            $('#keywords-result').html(`<h3>Keywords:</h3><ul>${data.keywords.map(k => `<li>${k}</li>`).join('')}</ul>`);
            console.log('Generated keywords:', data);
        },
        error: () => {
            alert('Error generating keywords');
        }
    });
}

//When click on useTitle span #finalTitle & #keywordTitle will be filled with the parent data-title
$(document).on('click', '.useTitle', function () {
    const title = $(this).parent().data('title');
    $('#finalTitle').val(title);
    $('#keywordTitle').val(title);
});
//When click on copyPost button inside .main-inner all html will be copied to clipboard
$(document).on('click', '#copyPost', function () {
    const post = $(document).find('.main-inner').html();
    const tempInput = document.createElement('textarea');
    tempInput.value = post;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    //After copy button will be changed to Copied for 2 seconds
    $(this).html('Copied');
    setTimeout(() => {
        $(this).html('Copy Post');
    }, 2000);
})
