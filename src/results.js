export class Result {
    static create(result) {
        return fetch('https://game-4584b-default-rtdb.firebaseio.com/results.json', {
            method: 'POST',
            body: JSON.stringify(result),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                result.id = response.name;
                return result;
            })
            .then(addToLocalStorage)
           // .then(Result.renderList)
    }
    /*static renderList(){
        const results = getResultsFromLocalStorage();
        const html = results.length
            ? results.map(toCard).join('')
            : `<div class='no-results-yet>У вас пока нет результатов. Вперед!</div>`
        const list = document.getElementById('list');
        list.innerHTML = html;
    }*/
}
export async function getResultsFromDataBase() {
    let response = await fetch('https://game-4584b-default-rtdb.firebaseio.com/results.json');
    response = await response.json();
    return response;
}

function addToLocalStorage(result) {
    const all = getResultsFromLocalStorage();
    all.push(result);
    localStorage.setItem('results', JSON.stringify(all))
}

export function getResultsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('results') || '[]')
}

export function toCard(result) {
    return `
        <div>
            <span><pre>${new Date(result.date).toLocaleDateString()}         ${result.user}      ${result.res}</pre></span>
        </div>
        <br>
    `
}