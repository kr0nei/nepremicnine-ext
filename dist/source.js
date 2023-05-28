"use strict";
var createImgElement = function () {
    var listItemImg = document.createElement('img');
    listItemImg.src = "index_files/price-tag-euro.svg";
    listItemImg.alt = "";
    listItemImg.className = "img-fluid";
    return listItemImg;
};
var properties = [];
var propertiesWithAddSorter = [];
function main() {
    var _a;
    var properties = document.querySelectorAll(".col-md-6.col-md-12.position-relative");
    var imgElement = createImgElement();
    properties.forEach(function (propertyElement, index) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var areaElement = propertyElement.querySelector('ul[itemprop="disambiguatingDescription"] li:first-child');
        var priceElement = propertyElement.querySelector('h6');
        var attrList = propertyElement.querySelector('ul[itemprop="disambiguatingDescription"]');
        var listItem = document.createElement('li');
        var area = Number.parseFloat((_d = (_c = (_b = (_a = areaElement === null || areaElement === void 0 ? void 0 : areaElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.split(' ')[0]) === null || _c === void 0 ? void 0 : _c.replace(',', '.')) !== null && _d !== void 0 ? _d : '0');
        var price = Number.parseFloat((_j = (_h = (_g = (_f = (_e = priceElement === null || priceElement === void 0 ? void 0 : priceElement.textContent) === null || _e === void 0 ? void 0 : _e.trim()) === null || _f === void 0 ? void 0 : _f.split(' ')[0]) === null || _g === void 0 ? void 0 : _g.replace('.', '')) === null || _h === void 0 ? void 0 : _h.replace(',', '.')) !== null && _j !== void 0 ? _j : '0');
        var pricePerSquareMeter = Math.round(price / area * 100) / 100;
        var pPSMel = document.createTextNode(pricePerSquareMeter + ' €/m');
        var sup = document.createElement('sup');
        sup.textContent = "2";
        listItem.appendChild(imgElement);
        listItem.appendChild(pPSMel);
        listItem.appendChild(sup);
        attrList === null || attrList === void 0 ? void 0 : attrList.appendChild(listItem);
        var property = {
            htmlElement: propertyElement,
            pricePerSquareMeter: pricePerSquareMeter
        };
        propertiesWithAddSorter.push(property);
    });
    var sortRow = (_a = document.querySelector(".sort.cb")) === null || _a === void 0 ? void 0 : _a.querySelector(".fl");
    var doSortEl = document.createElement("div");
    var sortButton = document.createElement("button");
    doSortEl.className = "msort";
    sortButton.onclick = doSort;
    sortButton.textContent = "Do Sort";
    doSortEl.appendChild(sortButton);
    sortRow.appendChild(doSortEl);
    //popup-sort-ul ui-dialog-content ui-widget-content
}
function doSort() {
    var parent = document.querySelector(".property-2.row.column-sm.property-label.property-grid.list-view.no-sidebar");
    var parser = new DOMParser();
    var dividerElem = (parser.parseFromString('<div class="col-md-12" style="margin:20px 0"><hr></div>', 'text/html')).body.firstChild;
    propertiesWithAddSorter = propertiesWithAddSorter === null || propertiesWithAddSorter === void 0 ? void 0 : propertiesWithAddSorter.sort(function (a, b) {
        return (a.pricePerSquareMeter < b.pricePerSquareMeter) ? 1 : -1;
    });
    parent.innerHTML = "";
    //console.log("doSort",propertiesWithAddSorter);
    for (var i = 0; i < propertiesWithAddSorter.length; i++) {
        parent.appendChild(propertiesWithAddSorter[i].htmlElement);
        parent.appendChild(dividerElem);
    }
}
window.onload = function () {
    main();
};
