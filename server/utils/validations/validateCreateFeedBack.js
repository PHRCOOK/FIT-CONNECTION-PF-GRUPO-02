const validateCreateFeedBack = ({ comment, raiting, post_at }) => {

    if (!comment) {
        throw new Error('Please enter a comment.');
    }

    if (!raiting) {
        throw new Error('Please enter a number between 1 - 10.');
    }

    if (!post_at) {
        throw new Error('Please enter a date.');
    }

    if (!isNaN(comment)) {
        throw new Error('The commet cannot be a number.')
    }

    if (typeof raiting === 'string') {
        throw new Error('The raiting cannot be a strign.')
    }

    // if (typeof post_at === 'string') {
    //     throw new Error('Please enter a date.')
    // }

};

module.exports = { validateCreateFeedBack };
