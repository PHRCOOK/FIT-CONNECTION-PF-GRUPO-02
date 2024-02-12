const validateCreateClientInfo = ({ address, phone, dni, birth_date }) => {
    const addressRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/; // Determina que debe tener letras y números.

    if (!address) {
        throw new Error('Please enter an address.');        
    }

    if (!addressRegex.test(address)) {
        throw new Error('Please enter a valid address.')
    }

    if (!phone) {
        throw new Error('Please enter a phone number.');
    }

    if (typeof phone === 'string') {
        throw new Error('The phone number must be a number.')
    }

    if (!dni) {
        throw new Error('Please enter a number of dni.');
    }

    if (typeof dni === 'string') {
        throw new Error('The dni must be a number.')
    }

    if (!birth_date) {
        throw new Error('Please enter a date.');
    }

}


module.exports = { validateCreateClientInfo }