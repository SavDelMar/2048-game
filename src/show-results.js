import { getResultsFromDataBase, getResultsFromLocalStorage, Result, toCard } from "./results";
import { createModal } from "./utils";

export function openMyResults() {
    const results = getResultsFromLocalStorage();
    const html = results.length
        ? results.map(toCard).join('')
        : `<div class='no-results-yet'>У вас пока нет результатов. Вперед!</div>`
    createModal('Мои результаты', html);
}

export async function openAllResults() {
    const results = await getResultsFromDataBase();
    const html = Object.values(results).length
        ? Object.values(results).sort((a, b) => (a.res > b.res) ? -1 : 1).map(toCard).join('')
        : `<div class='no-results-yet'> Турнирная таблица пока пуста. Стань первым! </div>`
    createModal('Турнирная таблица', html);
}
export async function bestScoreShow(bestScore) {
    const results = await getResultsFromDataBase();
    bestScore.textContent =  ' ' + Object.values(results).sort((a, b) => (a.res > b.res) ? -1 : 1)[0].res;
   
}