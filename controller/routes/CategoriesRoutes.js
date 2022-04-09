const Router = require('express').Router();
const Categories = require('../../models/Categories');

    Router.post("/", async(req, res) => {
        const { categoryName, categoryTag } = req.body;
    
        if (!categoryName) {
            res.status(422).json({ errorMessage: "Este campo é obrigatório"})
        }
    
        const category = {
            categoryName,
            categoryTag
        };
    
        try {
            await Categories.create(category)
            res.status(201).json({ message: "Categoria cadastrada com sucesso :)" })
        } catch (error) {
            res.status(500).json({ErrorMessage: "Erro no processo " + error})
        }
    })
    Router.get("/", async(req, res) => {
        try {
            const categoriasData = await Categories.find()
            res.status(200).json(categoriasData)
        } catch (error) {
            console.log(`Houve um problema${error}`)
        }
    })
//filtro categoria única
    Router.get("/:id", async(req, res) => {
        const id = req.params.id
        try {
            const categoria = await Categories.findOne({_id: id})
            res.status(200).json(categoria)
        } catch (error) {
            res.status(500).json({erro: error})
        }
    })

//Update categoria
    Router.patch("/:id", async(req, res) => {
        const id = req.params.id
        const {categoryName, categoryTag} = req.body

        const categoria = {
            categoryName, categoryTag
        }
        try {
            const UpdateCategory = await Categories.updateOne({_id:id}, categoria);
            if(UpdateCategory.matchedCount === 0){
                res.status(422).json({message: "usuário não foi editado"})
                return
            }
            res.status(200).json(categoria)

        } catch (error) {
            res.status(500).json({erro: error})
        }
    })
//delete
    Router.delete("/:id", async(req, res) => {
        const id = req.params.id

        const categoria = await Categories.findOne({_id: id})

        if(!categoria){
            res.status(422).json({msg: "usuário não encontrado"})
            return
        }

        try {
            await Categories.deleteOne({_id: id})
            res.status(200).json({ message: "usuário removido"})
        } catch (error) {
            res.status(500).json({mensagem: `Houve um erro ${error}`})
        }
    })

module.exports = Router