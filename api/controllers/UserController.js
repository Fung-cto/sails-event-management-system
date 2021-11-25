/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).json("User not found");

        await sails.helpers.passwords.checkPassword(req.body.password, user.password)
            .tolerate('incorrect', function (error) {
                req.body.password = false
            });

        if (!req.body.password) return res.status(401).json("Wrong Password");

        // Start a new session for the new login user
        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = user.username; //store the name of login user
            req.session.role = user.role;
            req.session.id = user.id;
            req.session.userId = user.id;
            return res.json(user);
        });
    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.redirect("/");
        });
    },

    // populate: async function (req, res) {

    //     var user = await User.findOne(req.params.id).populate("participant");
    
    //     if (!user) return res.notFound();
    
    //     return res.json(user);
    // },
    populate: async function (req, res) {

        var thatUser = await User.findOne(req.session.userId).populate("participant");

        if (!thatUser) return res.notFound();


        if (req.wantsJSON) {
            return res.status(200).json(thatUser);	    // for ajax request
        } else {
            return res.view('user/registered', { user: thatUser });			// for normal request
        }
    },

    add: async function (req, res) {

        if (!await User.findOne(req.session.userId)) return res.status(404).json("User not found.");

        var thatEvent = await Event.findOne(req.params.fk).populate("register", { id: req.session.userId });

        if (!thatEvent) return res.status(404).json("Event not found.");

        if (thatEvent.register.length > 0)
            return res.status(409).json("Already added.");   // conflict

        var event = await Event.findOne(req.params.fk);
        var user = await User.findOne(req.session.userId);

        if (event.Quota > 0) {
            await User.addToCollection(req.session.userId, "participant").members(req.params.fk);
            // var newQuota = {
            //     Quota: event.Quota - 1
            // }
            // // var updateEvent = await Event.updateOne(event.id).set(quotaUpdate);
            // await Event.updateOne(event.id).set(newQuota);
            if (req.wantsJSON) {
                return res.ok();	    // for ajax request
            } else {
                return res.redirect('user/' + user.id + '/register');			// for normal request
            }
        } else {
            return res.status().json("No quota remain");
        }
    },
    remove: async function (req, res) {

        if (!await User.findOne(req.session.userId)) return res.status(404).json("User not found.");

        var thatEvent = await Event.findOne(req.params.fk).populate("register", { id: req.session.userId });

        if (!thatEvent) return res.status(404).json("Event not found.");

        if (thatEvent.register.length == 0)
            return res.status(409).json("Nothing to delete.");    // conflict

        await User.removeFromCollection(req.session.userId, "participant").members(req.params.fk);

        return res.ok();
    },




};

