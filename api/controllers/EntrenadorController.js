/**
 * EntrenadorController
 *
 * @description :: Server-side logic for managing Entrenadors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearEntrenador: function (req, res) {

    if (req.method == "POST") {

      var parametros = req.allParams();
      if (parametros.nombres && parametros.imagen && parametros.fechaInicio && parametros.region) {

        var entrenadorCrear = {
          nombres: parametros.nombres,
          imagen: parametros.imagen,
          fechaInicio: parametros.fechaInicio,
          region: parametros.region
        };
        console.log(entrenadorCrear);
        Entrenador.create(entrenadorCrear).exec(function (err, entrenadorCreado) {

          if (err) {
            return res.view('vistas/Error', {
              error: {
                desripcion: "Fallo al crear el Entrenador",
                rawError: err,
                url: "/CrearEntrenador"
              }

            });
          }

          Entrenador.find()
            .exec(function (errorIndefinido, entrenadoresEncontrados) {

              if (errorIndefinido) {
                res.view('vistas/Error', {
                  error: {
                    desripcion: "Hubo un problema cargando los Entrenadores",
                    rawError: errorIndefinido,
                    url: "/ListarEntrenadores"
                  }
                });
              }

              res.view('Entrenador/listarEntrenadores', {
                entrenadores: entrenadoresEncontrados
              });
            })

        })


      } else {

        return res.view('vistas/Error', {
          error: {
            desripcion: "Llena todos los parametros.",
            rawError: "Fallo en envio de parametros.",
            url: "/CrearEntrenador"
          }

        });

      }


    } else {

      return res.view('vistas/Error', {
        error: {
          desripcion: "Error en el uso del Metodo HTTP",
          rawError: "HTTP Invalido",
          url: "/CrearEntrenador"
        }
      });

    }

  },
  borrarEntrenador: function (req, res) {
    var parametros = req.allParams();

    if (parametros.id) {

      Entrenador.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, EntrenadorRemovido) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              desripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarEntrenadores"
            }
          });
        }
        Entrenador.find()
          .exec(function (errorIndefinido, entrenadoresEncontrados) {

            if (errorIndefinido) {
              res.view('vistas/Error', {
                error: {
                  desripcion: "Hubo un problema cargando los entrenadores",
                  rawError: errorIndefinido,
                  url: "/ListarEntrenadores"
                }
              });
            }
            res.view('Entrenador/listarEntrenadores', {
              entrenadores: entrenadoresEncontrados
            });
          })
      })

    } else {
      return res.view('vistas/Error', {
        error: {
          desripcion: "Necesitamos el ID para borrar al Entrenador",
          rawError: "No envia ID",
          url: "/ListarEntrenadores"
        }
      });
    }
  },
  editarEntrenador: function (req, res) {
    var parametros = req.allParams();

    if (parametros.idEntrenador && (parametros.nombres || parametros.fechaInicio || parametros.region)) {


      var entrenadorAEditar = {
        nombres: parametros.nombres,
        imagen: parametros.imagen,
        fechaInicio: parametros.fechaInicio,
        region: parametros.region
      };

      Entrenador.update({
        id: parametros.idEntrenador
      }, entrenadorAEditar).exec(function (errorInesperado, entrenadorRemovido) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              desripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarEntrenadores"
            }
          });
        }
        Entrenador.find()
          .exec(function (errorIndefinido, entrenadoresEncontrados) {

            if (errorIndefinido) {
              res.view('vistas/Error', {
                error: {
                  desripcion: "Hubo un problema cargando los Entrenadores",
                  rawError: errorIndefinido,
                  url: "/EditarEntrenador"
                }
              });
            }

            res.view('Entrenador/listarEntrenadores', {
              entrenadores: entrenadoresEncontrados
            });
          })
      })

    } else {
      return res.view('vistas/Error', {
        error: {
          desripcion: "Necesitamos que envies los parámetros ",
          rawError: "No envia Parámetros",
          url: "/ListarEntrenadores"
        }
      });
    }

  },
};

