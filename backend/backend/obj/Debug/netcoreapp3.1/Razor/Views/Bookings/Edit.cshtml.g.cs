#pragma checksum "C:\Users\Drishti Bhujan\Desktop\Passe temps\Angular\Restaurant booking\backend\backend\Views\Bookings\Edit.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "a1d331521ef215a8822ad913e15578609a8580e7"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Bookings_Edit), @"mvc.1.0.view", @"/Views/Bookings/Edit.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"a1d331521ef215a8822ad913e15578609a8580e7", @"/Views/Bookings/Edit.cshtml")]
    public class Views_Bookings_Edit : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<backend.Models.Booking>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 3 "C:\Users\Drishti Bhujan\Desktop\Passe temps\Angular\Restaurant booking\backend\backend\Views\Bookings\Edit.cshtml"
  
    ViewData["Title"] = "Edit";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<h1>Edit</h1>

<h4>Booking</h4>
<hr />
<div class=""row"">
    <div class=""col-md-4"">
        <form asp-action=""Edit"">
            <div asp-validation-summary=""ModelOnly"" class=""text-danger""></div>
            <input type=""hidden"" asp-for=""Id"" />
            <div class=""form-group"">
                <label asp-for=""Location"" class=""control-label""></label>
                <input asp-for=""Location"" class=""form-control"" />
                <span asp-validation-for=""Location"" class=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <label asp-for=""Date"" class=""control-label""></label>
                <input asp-for=""Date"" class=""form-control"" />
                <span asp-validation-for=""Date"" class=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <label asp-for=""Time"" class=""control-label""></label>
                <input asp-for=""Time"" class=""form-control"" />
                <span asp-validation-for=""Time"" c");
            WriteLiteral(@"lass=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <label asp-for=""UserId"" class=""control-label""></label>
                <select asp-for=""UserId"" class=""form-control"" asp-items=""ViewBag.UserId""></select>
                <span asp-validation-for=""UserId"" class=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <input type=""submit"" value=""Save"" class=""btn btn-primary"" />
            </div>
        </form>
    </div>
</div>

<div>
    <a asp-action=""Index"">Back to List</a>
</div>

");
            DefineSection("Scripts", async() => {
                WriteLiteral("\r\n");
#nullable restore
#line 48 "C:\Users\Drishti Bhujan\Desktop\Passe temps\Angular\Restaurant booking\backend\backend\Views\Bookings\Edit.cshtml"
      await Html.RenderPartialAsync("_ValidationScriptsPartial");

#line default
#line hidden
#nullable disable
            }
            );
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<backend.Models.Booking> Html { get; private set; }
    }
}
#pragma warning restore 1591
