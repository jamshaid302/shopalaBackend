import productDAL from "../../services/product.js"
import campaignDAL from "../../services/campaign.js"
import responseSchema from "../../utils/responseSchema.js"

const getCampaignById = async (req, res) => {
  const body = {
    id: req.params.id,
  }
  let campaignData = await campaignDAL.getById(body)

  if (campaignData.message === "success" && campaignData.data?.[0]) {
    const data = campaignData.data[0]

    delete data.territory_id
    delete data.language_id
    delete data.currency_id
    delete data.product_id
    delete data.user_id
    delete data.image // campaign image
    delete data.name // campaign name
    delete data._id // campaign id
    delete data.__v // campaign

    data.currency = data.currency.name
    data.language = data.language.name
    data.territory = data.territory.name

    const { brand_logo, name, image } = data.product
    data.product = { brand_logo, name, image }

    data.user = { email: data.user.email }

    campaignData.data = data
  }

  const response = responseSchema.responseSchema(campaignData)
  response.status_code === 1
    ? res.status(200).json(response)
    : res.status(401).json(response)
}

export default {
  getCampaignById,
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         user_id:
 *           type: string
 *           description: The user_id
 *         name:
 *           type: string
 *           description: The name
 *         description:
 *           type: string
 *           description: The description
 *         quantity:
 *           type: number
 *           description: The quantity
 *         image:
 *           type: string
 *           description: The image
 *         brand_logo:
 *           type: string
 *           description: The brand_logo
 *
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Campaign:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         user_id:
 *           type: string
 *           description: The user_id
 *         product_id:
 *           type: string
 *           description: The product_id
 *         currency_id:
 *           type: string
 *           description: The currency
 *         price:
 *           type: number
 *           description: The price
 *         description:
 *           type: string
 *           description: The description
 *         status:
 *           type: string
 *           description: The status(active,pause)
 *         territory_id:
 *           type: string
 *           description: The territory_id
 *         language_id:
 *           type: string
 *           description: The language_id
 *         paypal:
 *           type: boolean
 *           description: The paypal
 *         ideal:
 *           type: boolean
 *           description: The ideal
 *         google_pay:
 *           type: boolean
 *           description: The google_pay
 *         apple_pay:
 *           type: boolean
 *           description: The apple_pay
 *         credit_card:
 *           type: boolean
 *           description: The credit_card
 *         free_shipping:
 *           type: boolean
 *           description: The free_shipping
 *         free_terms:
 *           type: string
 *           description: The free_terms
 *         thankyou:
 *           type: string
 *           description: The thankyou
 *         privacy_link:
 *           type: string
 *           description: The privacy_link
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: Payment APIs
 *   description: The User APIs
 */

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Payment APIs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 */

/**
 * @swagger
 * /campaign/{id}:
 *   get:
 *     summary: Get the campaign by id
 *     tags: [Payment APIs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The campaign id
 *     responses:
 *       200:
 *         description: The campaign description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 *       404:
 *         description: The campaign was not found
 */
