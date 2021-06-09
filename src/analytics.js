function createAnalytics() {
    let counter = 0;
    let isDestroyed = false;
    const listener = (evt) => {
        if (evt.key === 'i' || evt.key === 'o' || evt.key === 'p' || evt.key === 'k') {
            counter++;
        }
    }

    document.addEventListener('keydown', listener);

    return {
        destroy() {
            document.removeEventListener('keydown', listener);
            isDestroyed = true;
        },
        getKeydowns() {
            if (isDestroyed) {
                return 'Analytics is destroyed'
            }
            return counter;
        }
        
    }

}

window.analytics = createAnalytics();