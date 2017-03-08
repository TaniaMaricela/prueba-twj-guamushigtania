/**
 * RotasController
 *
 * @description :: Server-side logic for managing rotas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  home: function (req, res) {
    return res.view('vistas/home');
  },
  crearEntrenador: function (req, res) {
    return res.view('Entrenador/crearEntrenador');
  },
  error: function (req, res) {
    return res.view('vistas/Error', {
      error: {
        descripcion: "Pagina no encontrada Dirijase a Inicio",
        rawError: "Ruta equivocada",
        url: "/Inicio"
      }
    });
  },
  listarEntrenadores: function (req, res) {
    Entrenador.find()
      .exec(function (errorIndefinido, entrenadoresEncontrados) {

        if (errorIndefinido) {
          res.view('vistas/Error', {
            error: {
              descripcion: "Problema al ver Entrenadores",
              rawError: errorIndefinido,
              url: "/ListarEntrenadores"
            }
          });
        }

        res.view('Entrenador/listarEntrenadores', {
          entrenadores: entrenadoresEncontrados
        });
      })
  },
  editarEntrenador: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Entrenador.findOne({
        id: parametros.id
      }).exec(function (errorInesperado, entrenadorEncontrado) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              descripcion: "Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarEntrenadores"
            }
          });
        }
        if (entrenadorEncontrado) {
          return res.view("Entrenador/editarEntrenador", {
            entrenadorAEditar: entrenadorEncontrado
          });
        } else {
          return res.view('vistas/Error', {
            error: {
              descripcion: "El entrenador con id: " + parametros.id + " no existe.",
              rawError: "No existe el entrenador",
              url: "/ListarEntrenadores"
            }
          });
        }
      })
    } else {

      return res.view('vistas/Error', {
        error: {
          descripcion: "No ha enviado el parametro ID",
          rawError: "Faltan Parametros",
          url: "/ListarEntrenadores"
        }
      });

    }
  },
  crearPokemon: function (req, res) {
    Entrenador.find()
      .exec(function (errorIndefinido, entrenadoresEncontrados) {

        if (errorIndefinido) {
          res.view('vistas/Error', {
            error: {
              descripcion: "Hubo un problema cargando los Entrenadores",
              rawError: errorIndefinido,
              url: "/"
            }
          });
        }
        res.view('Pokemon/crearPokemon', {
          entrenadores: entrenadoresEncontrados
        });
      })
  },
  listarPokemon: function (req, res) {
    Pokemon.find().populate("idEntrenador")
      .exec(function (errorIndefinido, pokemonEncontrados) {

        if (errorIndefinido) {
          res.view('vistas/Error', {
            error: {
              descripcion: "Hubo un problema cargando los Pokemon",
              rawError: errorIndefinido,
              url: "/ListarPokemon"
            }
          });
        }

        res.view('Pokemon/listarPokemon', {
          pokemon: pokemonEncontrados
        });
      })
  },
  editarPokemon: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Pokemon.findOne({
        id: parametros.id
      }).populate("idEntrenador").exec(function (errorInesperado, pokemonEncontrado) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              descripcion: "Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarPokemon"
            }
          });
        }
        if (pokemonEncontrado) {
          Entrenador.find()
            .exec(function (errorIndefinido, entrenadoresEncontrados) {

              if (errorIndefinido) {
                res.view('vistas/Error', {
                  error: {
                    descripcion: "Hubo un problema cargando los Entrenadores",
                    rawError: errorIndefinido,
                    url: "/"
                  }
                });
              }
              return res.view("Pokemon/editarPokemon", {
                pokemonAEditar: pokemonEncontrado,
                entrenadores: entrenadoresEncontrados
              });

            })

        } else {
          return res.view('vistas/Error', {
            error: {
              descripcion: "El pokemon con id: " + parametros.id + " no existe.",
              rawError: "No existe el okemon",
              url: "/ListarPokemon"
            }
          });
        }
      })
    } else {

      return res.view('vistas/Error', {
        error: {
          descripcion: "No ha enviado el parametro ID",
          rawError: "Faltan Parametros",
          url: "/ListarPokemon"
        }
      });

    }
  },
};

