export const gstPercent = (taxMethod) => {
    if(taxMethod?.length !== ""){
        return taxMethod.replace("GST", "").replace("OUTPUT", "%")
    } else {
        return ""
    }
}