const WELCOME_KEY = 'welkomGetoond';

export function hasSeenWelcome() {
    return sessionStorage.getItem(WELCOME_KEY) === 'true';
}

export function setWelcomeSeen() {
    sessionStorage.setItem(WELCOME_KEY, 'true');
}

export function resetWelcome() {
    sessionStorage.removeItem(WELCOME_KEY);
}
