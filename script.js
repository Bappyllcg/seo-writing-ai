function generateTitles() {
    const topic = $('#topic').val();
    $.ajax({
        url: '/api/generate/title',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ topic }),
        success: (data) => {
            $('#titles-result').html(`
        <h3>Titles:</h3>
        <div class="title-list">
          ${data.titles.map(t => `
            <div class="title-item">
              <h4>${t.title}</h4>
              <p>${t.meta_description}</p>
            </div>
          `).join('')}
        </div>
      `);
            //console.log('Generated titles:', data);
        }
    }).fail(() => alert('Error generating titles'));
}

function generateKeywords() {
    const topic = $('#topic').val();
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

function generateContent() {
    const topic = $('#topic').val();
    $.ajax({
        url: '/api/generate/content',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ topic }),
        success: (data) => {
            //   $('#content-result').html(`<h3>Content:</h3><div>${data.content.replace(/\n/g, '<br>')}</div>`);
            $('#content-result').html(`<h3>Content:</h3><div>${data.content.replace('```html', '').replace('```', '')}</div>`);
            console.log('Generated content:', data);
        },
        error: () => {
            alert('Error generating content');
        }
    });
}