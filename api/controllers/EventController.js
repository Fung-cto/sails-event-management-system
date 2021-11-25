/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - create
    create: async function (req, res) {

        if (req.method == "GET") return res.view('event/create');

        if (req.body.HighlightEvent === 'on'){
            req.body.HighlightEvent = true;
        } else {
            req.body.HighlightEvent = false;
        }

        var event = await Event.create(req.body).fetch();

        return res.redirect('/');

    },

    // action - jsjson function
    json: async function (req, res) {

        var allEvent = await Event.find();

        return res.json(allEvent);
    },

    // action - admin
    admin: async function (req, res) {

        var allEvent = await Event.find();

        return res.view('event/admin', { events: allEvent });
    },

    // action - details
    details: async function (req, res) {

        var thatEvent = await Event.findOne(req.params.id);

        if (!thatEvent) return res.notFound();

        if (req.wantsJSON) {
            return res.json(thatEvent);	    // for ajax request
        } else {
            return res.view('event/details', { event: thatEvent });
        }
    },

    // action - update
    editEvent: async function (req, res) {

        if (req.method == "GET") {

            var thatEvent = await Event.findOne(req.params.id);

            if (!thatEvent) return res.notFound();

            return res.view('event/editEvent', { event: thatEvent });

        } else {

            var updatedEvent = await Event.updateOne(req.params.id).set(req.body);

            if (!updatedEvent) return res.notFound();

            if (req.wantsJSON){
                return res.status(204).send();	    // for ajax request
            } else {
                return res.redirect('/admin');			// for normal request
            }
           
        }
    },

    // action - delete 
    delete: async function (req, res) {

        var deletedEvent = await Event.destroyOne(req.params.id);

        if (!deletedEvent) return res.notFound();

        if (req.wantsJSON){
            return res.status(204).send();	    // for ajax request
        } else {
            return res.redirect('/');			// for normal request
        }

    },

    // action - Home show 4 highlights
    home: async function (req, res) {

        var allEvent = await Event.find();

        return res.view('event/home', { events: allEvent });
    },

    // action - Search_paginate
    paginate: async function (req, res) {

        var perPage = Math.max(req.query.perPage, 2) || 2;

        var someEvents = await Event.find({
            limit: perPage,
            skip: perPage * (Math.max(req.query.current - 1, 0) || 0)
        });

        var count = await Event.count();

        return res.view('event/search', { events: someEvents, total: count });
    },

    // search function
search: async function (req, res) {
    
    var whereClause = {};
    
    if (req.query.EventName) whereClause.EventName= { contains: req.query.EventName };
    if (req.query.Venue) whereClause.Venue= {contains: req.query.Venue};
    if (req.query.Organizer) whereClause.Organizer= {contains: req.query.Organizer};

    if (((req.query.StartDate)) && ((req.query.EndDate))) {
        whereClause.EventDate = { '>=': req.query.StartDate, '<=': req.query.EndDate };
    } else if (((req.query.StartDate)) && (!(req.query.EndDate))) {
        whereClause.EventDate = { '>=': req.query.StartDate };
    } else if ((!(req.query.StartDate)) && ((req.query.EndDate))) {
        whereClause.EventDate = { '<=': req.query.EndDate };
    }

    
    if (req.wantsJSON) {
        var perPage = Math.max(req.query.perPage, 2) || 2;
        var thoseEvents = await Event.find({
            limit: perPage,
            skip: perPage * (Math.max(req.query.current - 1, 0) || 0),
            where: whereClause,
        });

        return res.json(thoseEvents);
    } else {
        var count = await Event.count({
            where: whereClause,
        });
        return res.view('event/search', { events: thoseEvents, total: count });
    }
},

//    register: async function (req, res) {

//     // if (req.method == "GET") return res.view('event/details');
//     // var event = await Event.details(req.body).fetch();

//         if (!await User.findOne(req.params.id)) return res.status(404).json("User not found.");
        
//         var thatEvent = await Event.findOne(req.params.fk).populate("consultants", {id: req.params.id});
    
//         if (!thatEvent) return res.status(404).json("Event not found.");
            
//         if (thatPerson.consultants.length > 0)
//             return res.status(409).json("Already added.");   // conflict
        
//         await User.addToCollection(req.params.id, "clients").members(req.params.fk);
    
//         return res.ok();
//     },

    // action - populate
    populate: async function (req, res) {

        var thatEvent = await Event.findOne(req.params.id).populate("register");

        if (!thatEvent) return res.notFound();

        if (req.wantsJSON) {
            return res.status(200).json(thatEvent);	    // for ajax request
        } else {
            return res.view('event/registered', { events: thatEvent });			// for normal request
        }
        // return res.json(event);
    },

    registered: async function (req, res) {

        var allEvent = await Event.find();

        return res.view('event/registered', { events: allEvent });
    },

    add: async function (req, res) {

        // if (req.method == "GET") return res.view('event/details');
        // var event = await Event.details(req.body).fetch();
    
            if (!await User.findOne(req.params.id)) return res.status(404).json("User not found.");
            
            var thatEvent = await Event.findOne(req.params.fk).populate("consultants", {id: req.params.id});
        
            if (!thatEvent) return res.status(404).json("Event not found.");
                
            if (thatEvent.consultants.length > 0)
                return res.status(409).json("Already added.");   // conflict
            
            await User.addToCollection(req.params.id, "clients").members(req.params.fk);
        
            return res.ok();
        },


}
