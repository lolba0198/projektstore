import { getPromotion, getProduct } from "@/api"

const promotion = {
    state() {
        return {
            promotionObject: {},
            promotionLoading: false,
            promotionError: null
        }
    },

    mutations: {
        SET_PROMOTION_OBJECT(state, newPromotionObject) {
            state.promotionObject = newPromotionObject
        },

        SET_PROMOTION_LOADING(state, isLoading) {
            state.promotionLoading = isLoading
        },

        SET_PROMOTION_ERROR(state, error) {
            state.promotionError = error
        }
    },

    getters: {
        GET_PROMOTION_OBJECT(state) {
            return state.promotionObject
        },

        GET_PROMOTION_LOADING(state) {
            return state.promotionLoading
        },

        GET_PROMOTION_ERROR(state) {
            return state.promotionError
        }
    },

    actions: {
        async FETCH_PROMOTION({ commit }, promotionId) {
            commit("SET_PROMOTION_LOADING", true)
            
            commit("SET_PROMOTION_OBJECT", {})
            
            commit("SET_PROMOTION_ERROR", null)

            try {
                const data = await getPromotion(promotionId)

                const fullProducts = []
                for (const productId of data.items) {
                    const product = await getProduct(productId)
                    fullProducts.push(product)
                }

                const returnObject = {
                    ...data,
                    items: fullProducts
                }

                commit("SET_PROMOTION_OBJECT", returnObject)

            } catch (error) {
                console.error("Błąd podczas pobierania:", error)
                commit("SET_PROMOTION_ERROR", "Nie udało się pobrać produktów.")
            } finally {
                commit("SET_PROMOTION_LOADING", false)
            }
        }
    }
}

export default promotion
