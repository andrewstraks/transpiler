import Component from app.spike.Component;

class Banner extends Component {

    bannerName: null,

    //Przed renderowaniem templatki
    render: function(params){
        $this.bannerName = 'home_'+$this.bannerName;
    },

    //Po renderowaniu templatki
    init: function(params){
        $this.items = $parent.getItems();
    },

    setItems: function(items){

        $this.items = items;
        $this.update();

    }

}