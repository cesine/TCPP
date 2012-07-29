define([ 
    "backbone", 
    "handlebars", 
    "activity/Activity", 
    "activity/Activities",
    "activity/ActivityView",
    "activity/ActivityFeed",
    "app/PaginatedUpdatingCollectionView"
 ], function(
    Backbone, 
    Handlebars, 
    Activity, 
    Activities,
    ActivityView,
    ActivityFeed,
    PaginatedUpdatingCollectionView
) {
  var ActivityFeedView = Backbone.View.extend(
  /** @lends ActivityFeedView.prototype */
  {
    /**
     * @class The layout of the activity feed. This view is used in web
     *        widgets, it is also embeddable in the dashboard.
     * 
     * @property {String} format Valid values are "rightSide" and "minimized".
     * 
     * @extends Backbone.View
     * @constructs
     */
    initialize : function() {
      this.activitiesView = new PaginatedUpdatingCollectionView({
        collection           : this.model.get("activities"),
        childViewConstructor : ActivityView,
        childViewTagName     : 'li'
      });
      
      //TODO this is how i tested the activity feed database, see the ActivityTest where it is hanging out not being tested.
//          var a = new Activity();
//          a.save();
    },

    model : ActivityFeed,
    
    events : {
      "click .icon-minus-sign" : function() {
        this.format = "minimized";
        this.render();
      },
      "click .icon-plus-sign" : function() {
        this.format = "rightSide";
        this.render();
      }
    },
    
    template : Handlebars.templates.activity_feed,
    
    minimizedTemplate : Handlebars.templates.activity_feed_minimized,

    render : function() {
      if (this.format == "rightSide") {
        this.setElement($("#activity-feed"));
        $(this.el).html(this.template(this.model.toJSON()));
        
        this.activitiesView.el = this.$('.activities-updating-collection');
        this.activitiesView.render();
      } else if (this.format == "minimized") {
        this.setElement($("#activity-feed"));
        $(this.el).html(this.minimizedTemplate(this.model.toJSON()));
      }

      return this;
    }

  });

  return ActivityFeedView;
});