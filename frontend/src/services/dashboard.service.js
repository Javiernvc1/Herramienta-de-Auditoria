import { getAuditorias } from "./auditoria.service";
import { getEmpresas } from "./empresa.service";
import { getEquipos } from "./equipo.service";
import { getMarcos } from "./marco.service";
import { getUsers } from "./user.service";

export const getDashboardData = async () => {

    try {


        const [
            auditorias,
            empresas,
            equipos,
            marcos,
            usuarios
        ] = await Promise.all([
            getAuditorias(),
            getEmpresas(),
            getEquipos(),
            getMarcos(),
            getUsers()
        ]);

        const auditoriasRecientes =
            [...(auditorias || [])]
                .sort(
                    (a, b) =>
                        new Date(
                            b.fecha ||
                            b.createdAt ||
                            0
                        ) -
                        new Date(
                            a.fecha ||
                            a.createdAt ||
                            0
                        )
                )
                .slice(0, 5);

        return {

            metricas: {

                totalAuditorias:
                    auditorias?.length || 0,

                totalEmpresas:
                    empresas?.length || 0,

                totalEquipos:
                    equipos?.length || 0,

                totalMarcos:
                    marcos?.length || 0,

                totalUsuarios:
                    usuarios?.length || 0
            },

            auditoriasRecientes
        };


    } catch (error) {


        console.error(
            "dashboard.service -> getDashboardData",
            error
        );

        throw error;


    }
};
