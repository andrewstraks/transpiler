// //1. Tworzenie dziedziczenia w oparciu o prototypy ze wzgnędu na szybkość i brak refrencji
// //2. Stworzenie modułu assemblera do tworzenia konstrukcji
// //3. Stworzenie transpilera
// //4. Stworzenie prócz kompilatora templatek także kompilatora do transpilera żeby tworzył klasy wg paczek w projekcie z przedrostkiem app.
//
// app.spike.Assembler.createClass('app.config.Config', ['app.spike.WebConfig'], [], {
//
//     someProp: true,
//
//     someFunction: function(x){
//         console.log(x);
//     }
//
// });
//
// //Klasy zachowują się jak zwykłe obiekty i są singletonami
// //Importów można używać żeby ułatwiać kod ale nie trzeba
// //Importy klas mogą być z notacją $ lub wielkiej litery
//
// import $config from app.spike.Config;
// class Config extends $config {
//
//     someProp: true,
//
//     someFunction: function(x){
//         console.log(x);
//     }
//
// }
//
// import Controller from app.spike.Controller;
//
// class Home extends Controller {
//
//     init: function(params){
//
//     }
//
// }
//
// //Istnieją klasy instancyjne, dynamiczne które w parze z templatkami mogą posiadać żywy model
// //Cykl życia tych klas jest ściśle powiązany z ich osadzeniem na stronie
//
// import Component from app.spike.Component;
//
// dynamic class Banner<scope> extends Component {
//
//     before: function(model){
//
//     },
//
//     after: function(model){
//
//     },
//
//     init: function(params){
//
//
//     }
//
// }
//
// <component name="banner"></component>
//
//
//
//
//
var scope = {
  name: ''
}


function checkChanged(oldVal, newVal){

  if(oldVal !== newVal){
    console.log('values changed');
  }

}

Object.defineProperty(scope, 'name', {

  set: function(newValue){
    checkChanged(this.__value, newValue);
    this.__value = newValue;
  },
  get: function(){
    return this.__value;
  }

})

scope.name = 'Dawid';
scope.name = 'Dawid1';
scope.name = 'Dawid2'
scope.name = 'Dawid3';

/**
 * Templatka HTML docelowa
 */
var html = '<ul>';
for (var i = 0; i < $this.items.length; i++){
    html += '<li>';
    html += '<span watch="item.id">'+$this.items[i].id+'</span>';
    html += '<div>'+$this.items[i].name+'</div>';
    html += '</li>';
}
html += '</ul>';


/**
 * Templatka JSowa do watcherow
 */
    for (var i = 0; i < $this.items.length; i++){
        if($watch.contains('item.id')){
            $this.templateSelector().find('[watch=item.id]').html(
                '<span watch="item.id">'+$this.items[i].id+'</span>'
            );
        }
    }


    if($watch.contains('item.id')){
        for (var i = 0; i < $this.items.length; i++){
            $this.templateSelector().find('[watch=item.id]').html(
                '<span watch="item.id">'+$this.items[i].id+'</span>'
            );
        }
    }



