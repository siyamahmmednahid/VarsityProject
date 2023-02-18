let options = {
    // weekday: 'short', 
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Dhaka'
};

export const formattedDate = (date, options) => {
    try {
        // console.log(date);
        return new Intl.DateTimeFormat('en-GB', {
            // weekday: 'short', 
            year: options?.shortYear ? '2-digit' : 'numeric',
            month: 'short',
            day: 'numeric',
            timeZone: 'Asia/Dhaka'
        }).format(new Date(date))
    } catch (error) {
        return "invalid date"
    }
} 