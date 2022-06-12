export const convertOnline = (user) => {
    const currentDate = new Date();
    const date = new Date(Date.parse(user.lastOnline));
    let dateForOutput;

    if (
        currentDate.getFullYear() === date.getFullYear() &&
        currentDate.getMonth() === date.getMonth() &&
        currentDate.getDate() === date.getDate()
    ) {
        dateForOutput = `last seen today at ${date.getHours()}:${date.getMinutes()}`;
    } else if (
        currentDate.getFullYear() === date.getFullYear() &&
        currentDate.getMonth() === date.getMonth() &&
        currentDate.getDate() !== date.getDate()
    ) {
        date.toLocaleString('default', { month: 'long' });
        dateForOutput = `last seen ${date.getDate()}, 
            ${date.toLocaleString('en-US', {
                month: 'long',
            })} at ${date.getHours()}:${date.getMinutes()}`;
    }
    return dateForOutput;
}
