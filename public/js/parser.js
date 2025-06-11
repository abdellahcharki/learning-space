const parser = new edjsParser();


let myParser = (data)=>{
    data = data.blocks;

    let html = "";
    for(let b of data){
        let type = b.type;  
        switch (type) {
            case 'header':{
                let level = b.data.level;
                let h = "<h"+level+">"+b.data.text+"</h"+level+">";
                html += h;
            } break;
            case 'paragraph':{
                    html +="<p> "+b.data.text+"</p>";
            } break;
            case 'quote':{
                html +=`<blockquote> <p>${b.data.text}</p> <cite> ${b.data['caption']}</cite> </blockquote>`
                 
        } break;
            case 'list':{
                 html  += editorJsListToHtml(b);
            }break;
            case 'attaches':{
                html +=    editorJsAttachesToHtml(b);
            }break;
            case 'image':{
                let bb = b.data; 
                html += `<figure class="fig-img"><img class="img" src="${bb.file.url}"><figcaption class="fig-cap">${bb.caption}</figcaption></figure>`;
            }break;
            case 'delimiter':{
                html += `<div class="delimiter"></div>`;
            }break;
            case 'warning':{
                let data = b.data;
                console.log(data);
               html += `<div class="warning">
               <div class="w-icon"> <i class="fas fa-exclamation-triangle"></i></div>
               <div class='wbe'> 
               <h4>${data.title}</h4>
               <p>${data.message}</p>
               </div>
               </div>`
            }break;
            case 'math':{
                let data = b.data;
                html += `<div class="math-block">${katex.renderToString(data.math, { throwOnError: false })}</div>`;
                
            }break;

            case 'toggle': { 
                
                html+=`<button class="accordion-button" type="button" id="myAccordionButton">
                Accordion Item #1
                </button>

                <!-- Accordion Collapse -->
                <div id="collapseExample" class="accordion-collapse collapse">
                <div class="accordion-body">
                    Content goes here
                </div>
                </div>`;
            } break;
            case 'chart': {
                // Get chart data
                let data = b.data;
                let id = b.id;
                let { labels, values, type } = data;
            
                console.log( b );
            
                // Create canvas dynamically
                html += ` <canvas id="${id}" width="400" height="200"></canvas>`;
            
                // Ensure the canvas is in the DOM before accessing it
                setTimeout(() => {
                    let ctx = document.getElementById(id).getContext('2d');
                    const myChart = new Chart(ctx, {
                        type: type, // Set the chart type (e.g., bar)
                        data: {
                            labels: labels, // Set the x-axis labels
                            datasets: [{
                                label: 'Values', // Label for the dataset
                                data: values, // Set the y-axis values
                                // backgroundColor: '#000000', // Color for the bars
                                backgroundColor: [
                                    'rgba(255, 99, 132)',
                                    'rgba(255, 159, 64)',
                                    'rgba(255, 205, 86)',
                                    'rgba(75, 192, 192)',
                                    'rgba(54, 162, 235)',
                                    'rgba(153, 102, 255)',
                                    'rgba(201, 203, 207)'
                                  ],
                                borderWidth: 1, // Set the border width
                            }],
                        },
                        options: {
                            responsive: true, // Make the chart responsive
                            scales: {
                                y: {
                                    beginAtZero: true, // Start the y-axis from zero
                                },
                            },
                            plugins: {
                                legend: {
                                    display: true, // Display the legend
                                },
                            },
                        },
                    });
                }, 100); // Timeout to ensure canvas is added to the DOM before accessing it
            } break;
            
            case 'mermaid': {
                let data = b.data;
                console.log(data);
                
                html += `<div class='mermaid-wraper'> <div class="mermaid">${data.code}</div> <p>${data.caption}</p> </div>`;
            } break;
            case 'code':{
                var data = b.data;
                var lang= data.languageCode;
                lang = lang=='js'?"javascript":lang;
                var code = data.code

                const languageClass = lang ? `language-${lang}` : ''; // If language is specified, add the language class
                // Highlight the code using Prism.js
                const highlightedCode = Prism.highlight(code, Prism.languages[lang], lang);
                html += `<pre> <div class="codetools"> <span class='lang'>${lang}</span> <span class='copycode'> copy </span> </div> <code class="${languageClass}">${highlightedCode}</code></pre>`;
            }break;
            default: {
                html+=parser.parseBlock(b);
                console.log(b);
                
            }
               
        }
    } 
    return html;
}




function editorJsListToHtml(block) {
    if (block.type !== 'list' || !block.data || !block.data.items) {
        throw new Error("Invalid block format. Ensure it's an Editor.js List block.");
    }

    const listType = block.data.style === 'ordered' ? 'ol' : 'ul';
    const items = block.data.items
        .map(item => `<li>${item.content}</li>`)
        .join('');

    return `<${listType}>${items}</${listType}>`;
}


function editorJsAttachesToHtml(block) {
 
    
    if (block.type !== 'attaches' || !block.data || !block.data.file) {
        throw new Error("Invalid block format. Ensure it's an Editor.js Attaches block.");
    }

    const { title, file } = block.data;
    let fileExtension = file.url.split(".").at(-1);
    console.log(fileExtension);
    
    return `
        <div class="attachment">
            <a href="${file.url}" target="_blank" >
                <span><i class="fas fa-paperclip"></i></span>     
            <strong>${title || file.url} [${ String(fileExtension).toUpperCase() }]</strong>
            </a>
        </div>
    `;
}




 