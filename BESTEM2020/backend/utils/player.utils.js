const jwt = require('jsonwebtoken');

const addToken = (player, res) => {
    jwt.sign({ id: player._id }, process.env.JWT_KEY, (err, token) => {
        if (err) {
            res.status(404).json(err);
        }

        res.cookie('t', token);

        return res.json({
            player: {
                _id: player._id,
                username: player.username,
            },
            token,
        });
    });
};

const passwordValidator = (password) => {
    const regex = new RegExp('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$');
    console.log(password);
    return (regex.test(password));
};

const fullNameValidator = (fullName) => {
    const regex = new RegExp('^[a-zA-Z -._]{3,30}$');
    return regex.test(fullName);
};

const credentialsValidator = ({ username, password }) => {
    if (!passwordValidator(password)) {
        throw new Error('The password must be at least 6 characters long and contain only letters and numbers.');
    }

    if (!fullNameValidator(username)) {
        throw new Error('The username should contain only letters, numbers and special characters.');
    }
};

module.exports = { addToken, credentialsValidator };