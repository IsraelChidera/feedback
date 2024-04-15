export const GetTime = () => {
    const currentHour = new Date().getHours();

    switch (true) {
        case currentHour >= 1 && currentHour <= 11:
            return 'Good morning';
        case currentHour >= 12 && currentHour <= 16:
            return 'Good afternoon';
        default:
            return 'Good evening';
    }
}