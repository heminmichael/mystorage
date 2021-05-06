/*=========================================================================================
    File Name: app-user.js
    Description: User page JS
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(document).ready(function () {

  var isRtl;
  if ( $('html').attr('data-textdirection') == 'rtl' ) {
    isRtl = true;
  } else {
    isRtl = false;
  }

  //  Rendering badge in status column
  var customBadgeHTML = function (params) {
    var color = "";
    if (params.value == "active") {
      color = "success"
      return "<div class='badge badge-pill badge-light-" + color + "' >" + params.value + "</div>"
    } else if (params.value == "blocked") {
      color = "danger";
      return "<div class='badge badge-pill badge-light-" + color + "' >" + params.value + "</div>"
    } else if (params.value == "deactivated") {
      color = "warning";
      return "<div class='badge badge-pill badge-light-" + color + "' >" + params.value + "</div>"
    }
  }

  //  Rendering bullet in verified column
  var customBulletHTML = function (params) {
    var color = "";
    if (params.value == true) {
      color = "success"
      return "<div class='bullet bullet-sm bullet-" + color + "' >" + "</div>"
    } else if (params.value == false) {
      color = "secondary";
      return "<div class='bullet bullet-sm bullet-" + color + "' >" + "</div>"
    }
  }

  // Renering Icons in Actions column
  var customIconsHTML = function (params) {
    var usersIcons = document.createElement("span");
    var editIconHTML = "<a href='/app-user-edit/'><i class='users-edit-icon feather icon-edit-1 mr-50'></i></a>"
    var deleteIconHTML = document.createElement('i');
    var attr = document.createAttribute("class")
    attr.value = "users-delete-icon feather icon-trash-2"
    deleteIconHTML.setAttributeNode(attr);
    // selected row delete functionality
    deleteIconHTML.addEventListener("click", function () {
      deleteArr = [
        params.data
      ];
      // var selectedData = gridOptions.api.getSelectedRows();
      gridOptions.api.updateRowData({
        remove: deleteArr
      });
    });
    usersIcons.appendChild($.parseHTML(editIconHTML)[0]);
    usersIcons.appendChild(deleteIconHTML);
    //return usersIcons
    return "<a href='/dashboard/user-edit/"+params.data.id+"'><i class='users-edit-icon feather icon-edit-1 mr-50'></i></a><a href='/dashboard/user-view/"+params.data.id+"'>View</a>"

  }

  //  Rendering avatar in username column
  var customAvatarHTML = function (params) {
    //return "<span class='avatar'><img src='" + params.data.avatar + "' height='32' width='32'></span>" + params.value
    return params.value
  }
  var url = window.location.href;
  var parts = url.split("/");

  var btnAccept = function (params) {

    return "<a class='text-success' href='/dashboard/cv/accept/"+params.data.id+"/"+parts[parts.length-2]+"'>Accept</a>"
  }

  var btnReject = function (params) {
    return "<a class='text-danger' href='/dashboard/cv/reject/"+params.data.id+"/"+parts[parts.length-2]+"'>Reject</a>"
  }

  var btnReport = function (params) {
    return "<a class='text-warning' href='/dashboard/reportuser/"+params.data.id+"'>Report</a>"
  }

  // ag-grid
  /*** COLUMN DEFINE ***/

  var columnDefs = [{
      headerName: 'ID',
      field: 'id',
      width: 125,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true,
    },
    {
      headerName: 'First Name',
      field: 'name',
      filter: true,
      width: 175,
      cellRenderer: customAvatarHTML,
    },
    {
      headerName: 'Last Name',
      field: 'lastname',
      filter: true,
      width: 225,
    },
    {
      headerName: 'Gender',
      field: 'gender',
      filter: true,
      width: 200,
    },
    {
      headerName: 'Phone',
      field: 'phone',
      filter: true,
      width: 150,
    },
    {
      headerName: 'Location',
      field: 'user_location',
      filter: true,
      width: 150,
    },
    {
      headerName: 'Date of Birthday',
      field: 'DOB',
      filter: true,
      width: 150,
    },
    {
      headerName: 'Experience',
      field: 'experience',
      filter: true,
      width: 150,
    },
    {
      headerName: 'Skills',
      field: 'skills',
      filter: true,
      width: 150,
    },
    {
      headerName: 'Languages',
      field: 'languages',
      filter: true,
      width: 150,
    },
    {
      headerName: 'Department',
      field: 'depName',
      filter: true,
      width: 150,
    },
    {
      headerName: 'Others',
      field: 'others',
      filter: true,
      width: 150,
    },
    {
      headerName: 'About',
      field: 'about',
      filter: true,
      width: 150,
    },
    {
      headerName: 'Graduation',
      field: 'graduation',
      filter: true,
      width: 300,
    },
    {
      headerName: 'Graduation Year',
      field: 'graduationYear',
      filter: true,
      width: 150,
    },
    {
      headerName: 'Role',
      field: 'admin',
      filter: true,
      width: 150,
    },
    {
      headerName: 'is Blocked',
      field: 'isBlocked',
      filter: true,
      width: 150,
    },
    {
      headerName: 'Kh. Employee',
      field: 'isKhoshnaw',
      filter: true,
      width: 150,
    },
    {
      headerName: 'Actions',
      field: 'transactions',
      width: 140,
      cellRenderer: customIconsHTML,
    },
    {
      headerName: 'Accept',
      field: 'Accept',
      width: 120,
      cellRenderer: btnAccept,
    },
    {
      headerName: 'Reject',
      field: 'Reject',
      width: 120,
      cellRenderer: btnReject,
    },
    {
      headerName: 'Report',
      field: 'Report',
      width: 120,
      cellRenderer: btnReport,
    }
  ];

  /*** GRID OPTIONS ***/
  var gridOptions = {
    defaultColDef: {
      sortable: true
    },
    enableRtl: isRtl,
    columnDefs: columnDefs,
    rowSelection: "multiple",
    floatingFilter: true,
    filter: true,
    pagination: true,
    paginationPageSize: 20,
    pivotPanelShow: "always",
    colResizeDefault: "shift",
    animateRows: true,
    resizable: true
  };
  if (document.getElementById("myGrid")) {
    /*** DEFINED TABLE VARIABLE ***/
    var gridTable = document.getElementById("myGrid");

    var url = window.location.href;
    var parts = url.split("/");

    //alert(parts[parts.length-2]);
    /*** GET TABLE DATA FROM URL ***/
    agGrid
      .simpleHttpRequest({
        url: "/dashboard/user/"+parts[parts.length-2]+"/userspost.json"
      })
      .then(function (data) {
        gridOptions.api.setRowData(data);
      });

    /*** FILTER TABLE ***/
    function updateSearchQuery(val) {
      gridOptions.api.setQuickFilter(val);
    }

    $(".ag-grid-filter").on("keyup", function () {
      updateSearchQuery($(this).val());
    });

    /*** CHANGE DATA PER PAGE ***/
    function changePageSize(value) {
      gridOptions.api.paginationSetPageSize(Number(value));
    }

    $(".sort-dropdown .dropdown-item").on("click", function () {
      var $this = $(this);
      changePageSize($this.text());
      $(".filter-btn").text("1 - " + $this.text() + " of 50");
    });

    /*** EXPORT AS CSV BTN ***/
    $(".ag-grid-export-btn").on("click", function (params) {
      gridOptions.api.exportDataAsCsv();
    });

    //  filter data function
    var filterData = function agSetColumnFilter(column, val) {
      var filter = gridOptions.api.getFilterInstance(column)
      var modelObj = null
      if (val !== "all") {
        modelObj = {
          type: "equals",
          filter: val
        }
      }
      filter.setModel(modelObj)
      gridOptions.api.onFilterChanged()
    }
    //  filter inside role
    $("#users-list-gender").on("change", function () {
      var usersListGender = $("#users-list-gender").val();
      filterData("gender", usersListGender)
    });
    //  filter inside verified
    $("#users-list-khEmployee").on("change", function () {
      var usersListKHemployee = $("#users-list-khEmployee").val();
      filterData("isKhoshnaw", usersListKHemployee)
    });
    //  filter inside status
    $("#users-list-isBlocked").on("change", function () {
      var usersListBlocked = $("#users-list-isBlocked").val();
      filterData("isBlocked", usersListBlocked)
    });

    //filter inside location
    $("#users-list-location").on("change", function () {
      var usersListLocation = $("#users-list-location").val();
      filterData("user_location", usersListLocation)
    });
    //  filter inside department
    $("#users-list-department").on("change", function () {
      var usersListDepartment = $("#users-list-department").val();
      filterData("depName", usersListDepartment)
    });

    // filter inside department
    $("#users-list-role").on("change", function () {
      var usersListAdmin = $("#users-list-role").val();
      filterData("admin", usersListAdmin)
    });
    // filter reset
    $(".users-data-filter").click(function () {
      $('#users-list-role').prop('selectedIndex', 0);
      $('#users-list-role').change();
      $('#users-list-status').prop('selectedIndex', 0);
      $('#users-list-status').change();
      $('#users-list-verified').prop('selectedIndex', 0);
      $('#users-list-verified').change();
      $('#users-list-department').prop('selectedIndex', 0);
      $('#users-list-department').change();
    });

    /*** INIT TABLE ***/
    new agGrid.Grid(gridTable, gridOptions);
  }
  // users language select
  if ($("#users-language-select2").length > 0) {
    $("#users-language-select2").select2({
      dropdownAutoWidth: true,
      width: '100%'
    });
  }
  // users music select
  if ($("#users-music-select2").length > 0) {
    $("#users-music-select2").select2({
      dropdownAutoWidth: true,
      width: '100%'
    });
  }
  // users movies select
  if ($("#users-movies-select2").length > 0) {
    $("#users-movies-select2").select2({
      dropdownAutoWidth: true,
      width: '100%'
    });
  }
  // users birthdate date
  if ($(".birthdate-picker").length > 0) {
    $('.birthdate-picker').pickadate({
      format: 'mmmm, d, yyyy'
    });
  }
  // Input, Select, Textarea validations except submit button validation initialization
  if ($(".users-edit").length > 0) {
    $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
  }
});
