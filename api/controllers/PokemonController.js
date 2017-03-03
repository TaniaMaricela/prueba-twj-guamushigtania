/**
 * PokemonController
 *
 * @description :: Server-side logic for managing Pokemons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearPokemon: function (req, res) {

    if (req.method == "POST") {

      var parametros = req.allParams();
      if (parametros.nombre && parametros.imagen && parametros.tipo1 && parametros.tipo2 && parametros.idEntrenador) {

        var pokemonCrear = {
          nombre: parametros.nombre,
          imagen: parametros.imagen,
          tipo1:parametros.tipo1,
          tipo2:parametros.tipo2,
          idEntrenador:parametros.idEntrenador,
        };
        console.log(pokemonCrear);
        Pokemon.create(pokemonCrear).exec(function (err, pokemonCreado) {

          if (err) {
            return res.view('vistas/Error', {
              error: {
                desripcion: "Fallo al crear Pokémon",
                rawError: err,
                url: "/CrearPokemon"
              }

            });
          }

          Pokemon.find()
            .exec(function (errorIndefinido, pokemonEncontrados) {

              if (errorIndefinido) {
                res.view('vistas/Error', {
                  error: {
                    desripcion: "Hubo un problema cargando los pokémon",
                    rawError: errorIndefinido,
                    url: "/ListarPokemon"
                  }
                });
              }

              res.view('Pokemon/listarPokemon', {
                pokemon: pokemonEncontrados
              });
            })

        })


      } else {

        return res.view('vistas/Error', {
          error: {
            desripcion: "Llena todos los parametros.",
            rawError: "Fallo en envio de parametros.",
            url: "/CrearPokemon"
          }

        });

      }


    } else {

      return res.view('vistas/Error', {
        error: {
          desripcion: "Error en el uso del Metodo HTTP",
          rawError: "HTTP Invalido",
          url: "/CrearPokemon"
        }
      });

    }

  },
  borrarPokemon: function (req, res) {
    var parametros = req.allParams();

    if (parametros.id) {

      Pokemon.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, PokemonRemovido) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              desripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarPokemon"
            }
          });
        }
        Pokemon.find()
          .exec(function (errorIndefinido, pokemonEncontrados) {

            if (errorIndefinido) {
              res.view('vistas/Error', {
                error: {
                  desripcion: "Hubo un problema cargando los pokemon",
                  rawError: errorIndefinido,
                  url: "/ListarPokemon"
                }
              });
            }
            res.view('Pokemon/listarPokemon', {
              pokemon: pokemonEncontrados
            });
          })
      })

    } else {
      return res.view('vistas/Error', {
        error: {
          desripcion: "Necesitamos el ID para borrar al Pokemon",
          rawError: "No envia ID",
          url: "/ListarPokemon"
        }
      });
    }
  },
  editarPokemon: function (req, res) {
    var parametros = req.allParams();

    if (parametros.idPokemon && parametros.nombre && parametros.tipo1 && parametros.tipo2) {

      var pokemonAEditar = {
        nombre: parametros.nombre,
        imagen: parametros.imagen,
        tipo1:parametros.tipo1,
        tipo2:parametros.tipo2,
        idEntrenador:parametros.idEntrenador,
      };

      Pokemon.update({
        id: parametros.idPokemon
      }, pokemonAEditar).exec(function (errorInesperado, pokemonRemovido) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              desripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarPokemon"
            }
          });
        }
        Pokemon.find().populate("idEntrenador")
          .exec(function (errorIndefinido, pokemonEncontrados) {

            if (errorIndefinido) {
              res.view('vistas/Error', {
                error: {
                  desripcion: "Hubo un problema cargando los pokemon",
                  rawError: errorIndefinido,
                  url: "/EditarPokemon"
                }
              });
            }

            res.view('Pokemon/listarPokemon', {
              pokemon: pokemonEncontrados
            });
          })
      })

    } else {
      return res.view('vistas/Error', {
        error: {
          desripcion: "Necesitamos que envies los parámetros ",
          rawError: "No envia Parámetros",
          url: "/ListarPokemon"
        }
      });
    }

  },
};

