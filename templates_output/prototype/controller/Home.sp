import Controller from app.spike.Controller;
import $api from app.service.Api;
import $$ from app.underscore;

class Home extends Controller {

    name: 'Wiesiek',
    items: [],

    init: function(params){

        $api.getItems().then(function(result){

            $this.items = result;
            $this.items = $$.sortBy('id');
            //zastanowic sie co sie stanie jak w liscie 1,000,000 itemow zmieni sie jeden "id"
            //na przyklad - rysowanie od nowa listy jest beznadziejne
            //moze lepiej robic indexy w DOMie i sprawdzac

            $this.update(); //Przerysowuje cały widok
            $this.update('item.id'); //Przerysowuje tylko tam gdzie [watch]="item.id"

            $child.bannerRight.setItems($this.items);

        });

    },

    getItems: function(){
        return $this.items;
    }

}