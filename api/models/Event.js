/**
 * Event.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    EventName:{
      type:"string",
      required: true
    },

    Organizer:{
      type:"string"
    },

    ShortDescription:{
      type:"string"
    },

    LongDescription:{
      type:"string"
    },

    EventDate:{
      type:"string"
    },

    StartTime:{
      type:"string"
    },

    EndTime:{
      type:"string"
    },

    Venue:{
      type:"string"
    },
    
    ImageURL:{
      type:"string"
    },

    HighlightEvent: {
      type:"Boolean"
    },
    Quota: {
      type: "number"
    },

   



    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    register: {
      collection: 'User',
      via: 'participant'
    },

    consultants: {
      collection: 'User',
      via: 'clients'
    },

  },

};

