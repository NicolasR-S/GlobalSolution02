import {db} from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios";

    db.query(q, (err, data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q =
        "INSERT INTO usuarios(`tipo_medicamento`, `destino`, `quantidade_kg`, `data_emissao`) VALUES(?)";
    
    const values = [
        req.body.tipo_medicamento,
        req.body.destino,
        req.body.quantidade_kg,
        req.body.data_emissao,

    ];

    db.query(q, [values], (err) =>{
        if (err) return res.json(err);

        return res.status(200).json("criado com sucesso.");
    });

};

export const updateUser = (req, res) => {
    const q = 
     "UPDATE usuarios SET `tipo_medicamento` = ?, `destino` = ?, `quantidade_kg` = ?, `data_emissao` = ? WHERE `id` = ? "

    const values = [
        req.body.tipo_medicamento,
        req.body.destino,
        req.body.quantidade_kg,
        req.body.data_emissao,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("atualizado com sucesso");
    });


};


export const deletUser = (req, res) => {
    const q = "DELETE FROM usuarios WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("deletado com sucesso");
    });
};