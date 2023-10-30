var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'type': 'base',
            'opacity': 0.600000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_plantcountries_species_1 = new ol.format.GeoJSON();
var features_plantcountries_species_1 = format_plantcountries_species_1.readFeatures(json_plantcountries_species_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_plantcountries_species_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_plantcountries_species_1.addFeatures(features_plantcountries_species_1);
var lyr_plantcountries_species_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_plantcountries_species_1,
maxResolution:1493.510385036206,
 
                style: style_plantcountries_species_1,
                interactive: true,
                title: '<img src="styles/legend/plantcountries_species_1.png" /> plantcountries_species'
            });
var format_plantcountries_2 = new ol.format.GeoJSON();
var features_plantcountries_2 = format_plantcountries_2.readFeatures(json_plantcountries_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_plantcountries_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_plantcountries_2.addFeatures(features_plantcountries_2);cluster_plantcountries_2 = new ol.source.Cluster({
  distance: 10,
  source: jsonSource_plantcountries_2
});
var lyr_plantcountries_2 = new ol.layer.Vector({
                declutter: true,
                source:cluster_plantcountries_2, 
                style: style_plantcountries_2,
                interactive: true,
                title: '<img src="styles/legend/plantcountries_2.png" /> plantcountries'
            });

lyr_OpenStreetMap_0.setVisible(true);lyr_plantcountries_species_1.setVisible(true);lyr_plantcountries_2.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_plantcountries_species_1,lyr_plantcountries_2];
lyr_plantcountries_species_1.set('fieldAliases', {'pk_populat': 'pk_populat', 'pop_cod': 'pop_cod', 'country_po': 'country_po', 'pk_species': 'pk_species', 'kingdom': 'kingdom', 'genus': 'genus', 'species': 'species', 'subspecies': 'subspecies', 'metapop': 'metapop', 'community': 'community', 'pk_init_in': 'pk_init_in', 'init_info': 'init_info', 'init_info_': 'init_info_', 'publicatio': 'publicatio', 'last_admin': 'last_admin', 'most_recen': 'most_recen', 'potentials': 'potentials', 'general_re': 'general_re', 'pk_reason': 'pk_reason', 'reason': 'reason', 'reason_en': 'reason_en', 'justif_det': 'justif_det', 'extinct_yr': 'extinct_yr', 'extinct__1': 'extinct__1', 'pk_rescue': 'pk_rescue', 'rescue': 'rescue', 'rescue_en': 'rescue_en', 'objectives': 'objectives', 'context_re': 'context_re', 'pk_translo': 'pk_translo', 'transloc': 'transloc', 'transloc_e': 'transloc_e', 'pk_altern': 'pk_altern', 'altern': 'altern', 'altern_en': 'altern_en', 'pk_reinfor': 'pk_reinfor', 'reinfor': 'reinfor', 'reinfor_en': 'reinfor_en', 'pk_clust': 'pk_clust', 'clust': 'clust', 'clust_en': 'clust_en', 'pk_separat': 'pk_separat', 'separation': 'separation', 'separati_1': 'separati_1', 'first_rele': 'first_rele', 'precision_': 'precision_', 'last_relea': 'last_relea', 'precisio_1': 'precisio_1', 'pk_phase': 'pk_phase', 'phase': 'phase', 'phase_en': 'phase_en', 'fk_multisi': 'fk_multisi', 'fk_multi_s': 'fk_multi_s', 'typ_rem': 'typ_rem', 'lat_pop': 'lat_pop', 'long_pop': 'long_pop', 'lieu_dit': 'lieu_dit', 'loc_rem': 'loc_rem', 'dist': 'dist', 'pk_origin': 'pk_origin', 'origin': 'origin', 'origin_en': 'origin_en', 'pk_connex': 'pk_connex', 'connex': 'connex', 'connex_en': 'connex_en', 'isol_caus': 'isol_caus', 'pop_hab': 'pop_hab', 'pk_protec_': 'pk_protec_', 'protec_fir': 'protec_fir', 'protec_f_1': 'protec_f_1', 'pk_prote_1': 'pk_prote_1', 'protec_las': 'protec_las', 'protec_l_1': 'protec_l_1', 'pk_prote_2': 'pk_prote_2', 'protec_csq': 'protec_csq', 'protec_c_1': 'protec_c_1', 'sit_rem': 'sit_rem', 'pk_legal_p': 'pk_legal_p', 'legal_prot': 'legal_prot', 'legal_pr_1': 'legal_pr_1', 'pk_div_sta': 'pk_div_sta', 'div_stag': 'div_stag', 'div_stag_e': 'div_stag_e', 'pk_birth': 'pk_birth', 'birth': 'birth', 'birth_en': 'birth_en', 'pk_div_ori': 'pk_div_ori', 'div_orig': 'div_orig', 'div_orig_e': 'div_orig_e', 'biol_rem': 'biol_rem', 'pk_prep_ha': 'pk_prep_ha', 'prep_hab': 'prep_hab', 'prep_hab_e': 'prep_hab_e', 'time_exsit': 'time_exsit', 'pk_stage_c': 'pk_stage_c', 'stage_chan': 'stage_chan', 'stage_ch_1': 'stage_ch_1', 'pk_gen_pro': 'pk_gen_pro', 'gen_prog': 'gen_prog', 'gen_prog_e': 'gen_prog_e', 'pk_increas': 'pk_increas', 'increase': 'increase', 'increase_e': 'increase_e', 'increase_m': 'increase_m', 'pk_env_con': 'pk_env_con', 'env_condit': 'env_condit', 'env_cond_1': 'env_cond_1', 'pk_sub_pop': 'pk_sub_pop', 'sub_pops': 'sub_pops', 'sub_pops_e': 'sub_pops_e', 'pk_tech_de': 'pk_tech_de', 'tech_det': 'tech_det', 'tech_det_e': 'tech_det_e', 'pk_temp_sp': 'pk_temp_sp', 'temp_sprea': 'temp_sprea', 'temp_spr_1': 'temp_spr_1', 'nb_release': 'nb_release', 'tot_nb': 'tot_nb', 'meth_rem': 'meth_rem', 'obs_max': 'obs_max', 'pk_pop_abu': 'pk_pop_abu', 'pop_abunda': 'pop_abunda', 'pop_abun_1': 'pop_abun_1', 'pk_time_se': 'pk_time_se', 'time_serie': 'time_serie', 'time_ser_1': 'time_ser_1', 'pk_founder': 'pk_founder', 'founder_de': 'founder_de', 'founder__1': 'founder__1', 'pk_descend': 'pk_descend', 'descend_de': 'descend_de', 'descend__1': 'descend__1', 'pk_pva': 'pk_pva', 'pva': 'pva', 'pva_en': 'pva_en', 'monit_rem': 'monit_rem', 'pk_found_1': 'pk_found_1', 'founder_re': 'founder_re', 'founder__2': 'founder__2', 'pk_desce_1': 'pk_desce_1', 'descend_re': 'descend_re', 'descend__2': 'descend__2', 'pk_dispers': 'pk_dispers', 'dispersal': 'dispersal', 'dispersal_': 'dispersal_', 'pk_ecosyst': 'pk_ecosyst', 'ecosyst_cs': 'ecosyst_cs', 'ecosyst__1': 'ecosyst__1', 'pk_ses_csq': 'pk_ses_csq', 'ses_csq': 'ses_csq', 'ses_csq_en': 'ses_csq_en', 'det_csq': 'det_csq', 'res_rem': 'res_rem', 'pk_pop_eva': 'pk_pop_eva', 'pop_eval': 'pop_eval', 'pop_eval_e': 'pop_eval_e', 'pk_experim': 'pk_experim', 'experim_ev': 'experim_ev', 'experim__1': 'experim__1', 'pk_ecosy_1': 'pk_ecosy_1', 'ecosyst_ev': 'ecosyst_ev', 'ecosyst__2': 'ecosyst__2', 'pk_ses_eva': 'pk_ses_eva', 'ses_eval': 'ses_eval', 'ses_eval_e': 'ses_eval_e', 'mortality': 'mortality', 'pk_user': 'pk_user', 'firstname': 'firstname', 'lastname': 'lastname', 'date_creat': 'date_creat', 'date_modif': 'date_modif', 'geom_pop': 'geom_pop', 'pop_protec': 'pop_protec', });
lyr_plantcountries_2.set('fieldAliases', {'pk_populat': 'pk_populat', 'pop_cod': 'pop_cod', 'country_po': 'country_po', 'pk_species': 'pk_species', 'kingdom': 'kingdom', 'genus': 'genus', 'species': 'species', 'subspecies': 'subspecies', 'metapop': 'metapop', 'community': 'community', 'pk_init_in': 'pk_init_in', 'init_info': 'init_info', 'init_info_': 'init_info_', 'publicatio': 'publicatio', 'last_admin': 'last_admin', 'most_recen': 'most_recen', 'potentials': 'potentials', 'general_re': 'general_re', 'pk_reason': 'pk_reason', 'reason': 'reason', 'reason_en': 'reason_en', 'justif_det': 'justif_det', 'extinct_yr': 'extinct_yr', 'extinct__1': 'extinct__1', 'pk_rescue': 'pk_rescue', 'rescue': 'rescue', 'rescue_en': 'rescue_en', 'objectives': 'objectives', 'context_re': 'context_re', 'pk_translo': 'pk_translo', 'transloc': 'transloc', 'transloc_e': 'transloc_e', 'pk_altern': 'pk_altern', 'altern': 'altern', 'altern_en': 'altern_en', 'pk_reinfor': 'pk_reinfor', 'reinfor': 'reinfor', 'reinfor_en': 'reinfor_en', 'pk_clust': 'pk_clust', 'clust': 'clust', 'clust_en': 'clust_en', 'pk_separat': 'pk_separat', 'separation': 'separation', 'separati_1': 'separati_1', 'first_rele': 'first_rele', 'precision_': 'precision_', 'last_relea': 'last_relea', 'precisio_1': 'precisio_1', 'pk_phase': 'pk_phase', 'phase': 'phase', 'phase_en': 'phase_en', 'fk_multisi': 'fk_multisi', 'fk_multi_s': 'fk_multi_s', 'typ_rem': 'typ_rem', 'lat_pop': 'lat_pop', 'long_pop': 'long_pop', 'lieu_dit': 'lieu_dit', 'loc_rem': 'loc_rem', 'dist': 'dist', 'pk_origin': 'pk_origin', 'origin': 'origin', 'origin_en': 'origin_en', 'pk_connex': 'pk_connex', 'connex': 'connex', 'connex_en': 'connex_en', 'isol_caus': 'isol_caus', 'pop_hab': 'pop_hab', 'pk_protec_': 'pk_protec_', 'protec_fir': 'protec_fir', 'protec_f_1': 'protec_f_1', 'pk_prote_1': 'pk_prote_1', 'protec_las': 'protec_las', 'protec_l_1': 'protec_l_1', 'pk_prote_2': 'pk_prote_2', 'protec_csq': 'protec_csq', 'protec_c_1': 'protec_c_1', 'sit_rem': 'sit_rem', 'pk_legal_p': 'pk_legal_p', 'legal_prot': 'legal_prot', 'legal_pr_1': 'legal_pr_1', 'pk_div_sta': 'pk_div_sta', 'div_stag': 'div_stag', 'div_stag_e': 'div_stag_e', 'pk_birth': 'pk_birth', 'birth': 'birth', 'birth_en': 'birth_en', 'pk_div_ori': 'pk_div_ori', 'div_orig': 'div_orig', 'div_orig_e': 'div_orig_e', 'biol_rem': 'biol_rem', 'pk_prep_ha': 'pk_prep_ha', 'prep_hab': 'prep_hab', 'prep_hab_e': 'prep_hab_e', 'time_exsit': 'time_exsit', 'pk_stage_c': 'pk_stage_c', 'stage_chan': 'stage_chan', 'stage_ch_1': 'stage_ch_1', 'pk_gen_pro': 'pk_gen_pro', 'gen_prog': 'gen_prog', 'gen_prog_e': 'gen_prog_e', 'pk_increas': 'pk_increas', 'increase': 'increase', 'increase_e': 'increase_e', 'increase_m': 'increase_m', 'pk_env_con': 'pk_env_con', 'env_condit': 'env_condit', 'env_cond_1': 'env_cond_1', 'pk_sub_pop': 'pk_sub_pop', 'sub_pops': 'sub_pops', 'sub_pops_e': 'sub_pops_e', 'pk_tech_de': 'pk_tech_de', 'tech_det': 'tech_det', 'tech_det_e': 'tech_det_e', 'pk_temp_sp': 'pk_temp_sp', 'temp_sprea': 'temp_sprea', 'temp_spr_1': 'temp_spr_1', 'nb_release': 'nb_release', 'tot_nb': 'tot_nb', 'meth_rem': 'meth_rem', 'obs_max': 'obs_max', 'pk_pop_abu': 'pk_pop_abu', 'pop_abunda': 'pop_abunda', 'pop_abun_1': 'pop_abun_1', 'pk_time_se': 'pk_time_se', 'time_serie': 'time_serie', 'time_ser_1': 'time_ser_1', 'pk_founder': 'pk_founder', 'founder_de': 'founder_de', 'founder__1': 'founder__1', 'pk_descend': 'pk_descend', 'descend_de': 'descend_de', 'descend__1': 'descend__1', 'pk_pva': 'pk_pva', 'pva': 'pva', 'pva_en': 'pva_en', 'monit_rem': 'monit_rem', 'pk_found_1': 'pk_found_1', 'founder_re': 'founder_re', 'founder__2': 'founder__2', 'pk_desce_1': 'pk_desce_1', 'descend_re': 'descend_re', 'descend__2': 'descend__2', 'pk_dispers': 'pk_dispers', 'dispersal': 'dispersal', 'dispersal_': 'dispersal_', 'pk_ecosyst': 'pk_ecosyst', 'ecosyst_cs': 'ecosyst_cs', 'ecosyst__1': 'ecosyst__1', 'pk_ses_csq': 'pk_ses_csq', 'ses_csq': 'ses_csq', 'ses_csq_en': 'ses_csq_en', 'det_csq': 'det_csq', 'res_rem': 'res_rem', 'pk_pop_eva': 'pk_pop_eva', 'pop_eval': 'pop_eval', 'pop_eval_e': 'pop_eval_e', 'pk_experim': 'pk_experim', 'experim_ev': 'experim_ev', 'experim__1': 'experim__1', 'pk_ecosy_1': 'pk_ecosy_1', 'ecosyst_ev': 'ecosyst_ev', 'ecosyst__2': 'ecosyst__2', 'pk_ses_eva': 'pk_ses_eva', 'ses_eval': 'ses_eval', 'ses_eval_e': 'ses_eval_e', 'mortality': 'mortality', 'pk_user': 'pk_user', 'firstname': 'firstname', 'lastname': 'lastname', 'date_creat': 'date_creat', 'date_modif': 'date_modif', 'geom_pop': 'geom_pop', 'pop_protec': 'pop_protec', });
lyr_plantcountries_species_1.set('fieldImages', {'pk_populat': 'Range', 'pop_cod': 'TextEdit', 'country_po': 'TextEdit', 'pk_species': 'Range', 'kingdom': 'TextEdit', 'genus': 'TextEdit', 'species': 'TextEdit', 'subspecies': 'TextEdit', 'metapop': 'TextEdit', 'community': 'TextEdit', 'pk_init_in': 'TextEdit', 'init_info': 'TextEdit', 'init_info_': 'TextEdit', 'publicatio': 'TextEdit', 'last_admin': 'TextEdit', 'most_recen': 'TextEdit', 'potentials': 'TextEdit', 'general_re': 'TextEdit', 'pk_reason': 'TextEdit', 'reason': 'TextEdit', 'reason_en': 'TextEdit', 'justif_det': 'TextEdit', 'extinct_yr': 'TextEdit', 'extinct__1': 'TextEdit', 'pk_rescue': 'TextEdit', 'rescue': 'TextEdit', 'rescue_en': 'TextEdit', 'objectives': 'TextEdit', 'context_re': 'TextEdit', 'pk_translo': 'TextEdit', 'transloc': 'TextEdit', 'transloc_e': 'TextEdit', 'pk_altern': 'TextEdit', 'altern': 'TextEdit', 'altern_en': 'TextEdit', 'pk_reinfor': 'TextEdit', 'reinfor': 'TextEdit', 'reinfor_en': 'TextEdit', 'pk_clust': 'TextEdit', 'clust': 'TextEdit', 'clust_en': 'TextEdit', 'pk_separat': 'TextEdit', 'separation': 'TextEdit', 'separati_1': 'TextEdit', 'first_rele': 'Range', 'precision_': 'TextEdit', 'last_relea': 'TextEdit', 'precisio_1': 'TextEdit', 'pk_phase': 'TextEdit', 'phase': 'TextEdit', 'phase_en': 'TextEdit', 'fk_multisi': 'TextEdit', 'fk_multi_s': 'TextEdit', 'typ_rem': 'TextEdit', 'lat_pop': 'TextEdit', 'long_pop': 'TextEdit', 'lieu_dit': 'TextEdit', 'loc_rem': 'TextEdit', 'dist': 'TextEdit', 'pk_origin': 'TextEdit', 'origin': 'TextEdit', 'origin_en': 'TextEdit', 'pk_connex': 'TextEdit', 'connex': 'TextEdit', 'connex_en': 'TextEdit', 'isol_caus': 'TextEdit', 'pop_hab': 'TextEdit', 'pk_protec_': 'TextEdit', 'protec_fir': 'TextEdit', 'protec_f_1': 'TextEdit', 'pk_prote_1': 'TextEdit', 'protec_las': 'TextEdit', 'protec_l_1': 'TextEdit', 'pk_prote_2': 'TextEdit', 'protec_csq': 'TextEdit', 'protec_c_1': 'TextEdit', 'sit_rem': 'TextEdit', 'pk_legal_p': 'TextEdit', 'legal_prot': 'TextEdit', 'legal_pr_1': 'TextEdit', 'pk_div_sta': 'TextEdit', 'div_stag': 'TextEdit', 'div_stag_e': 'TextEdit', 'pk_birth': 'TextEdit', 'birth': 'TextEdit', 'birth_en': 'TextEdit', 'pk_div_ori': 'TextEdit', 'div_orig': 'TextEdit', 'div_orig_e': 'TextEdit', 'biol_rem': 'TextEdit', 'pk_prep_ha': 'TextEdit', 'prep_hab': 'TextEdit', 'prep_hab_e': 'TextEdit', 'time_exsit': 'TextEdit', 'pk_stage_c': 'TextEdit', 'stage_chan': 'TextEdit', 'stage_ch_1': 'TextEdit', 'pk_gen_pro': 'TextEdit', 'gen_prog': 'TextEdit', 'gen_prog_e': 'TextEdit', 'pk_increas': 'TextEdit', 'increase': 'TextEdit', 'increase_e': 'TextEdit', 'increase_m': 'TextEdit', 'pk_env_con': 'TextEdit', 'env_condit': 'TextEdit', 'env_cond_1': 'TextEdit', 'pk_sub_pop': 'TextEdit', 'sub_pops': 'TextEdit', 'sub_pops_e': 'TextEdit', 'pk_tech_de': 'TextEdit', 'tech_det': 'TextEdit', 'tech_det_e': 'TextEdit', 'pk_temp_sp': 'TextEdit', 'temp_sprea': 'TextEdit', 'temp_spr_1': 'TextEdit', 'nb_release': 'TextEdit', 'tot_nb': 'TextEdit', 'meth_rem': 'TextEdit', 'obs_max': 'TextEdit', 'pk_pop_abu': 'TextEdit', 'pop_abunda': 'TextEdit', 'pop_abun_1': 'TextEdit', 'pk_time_se': 'TextEdit', 'time_serie': 'TextEdit', 'time_ser_1': 'TextEdit', 'pk_founder': 'TextEdit', 'founder_de': 'TextEdit', 'founder__1': 'TextEdit', 'pk_descend': 'TextEdit', 'descend_de': 'TextEdit', 'descend__1': 'TextEdit', 'pk_pva': 'TextEdit', 'pva': 'TextEdit', 'pva_en': 'TextEdit', 'monit_rem': 'TextEdit', 'pk_found_1': 'TextEdit', 'founder_re': 'TextEdit', 'founder__2': 'TextEdit', 'pk_desce_1': 'TextEdit', 'descend_re': 'TextEdit', 'descend__2': 'TextEdit', 'pk_dispers': 'TextEdit', 'dispersal': 'TextEdit', 'dispersal_': 'TextEdit', 'pk_ecosyst': 'TextEdit', 'ecosyst_cs': 'TextEdit', 'ecosyst__1': 'TextEdit', 'pk_ses_csq': 'TextEdit', 'ses_csq': 'TextEdit', 'ses_csq_en': 'TextEdit', 'det_csq': 'TextEdit', 'res_rem': 'TextEdit', 'pk_pop_eva': 'TextEdit', 'pop_eval': 'TextEdit', 'pop_eval_e': 'TextEdit', 'pk_experim': 'TextEdit', 'experim_ev': 'TextEdit', 'experim__1': 'TextEdit', 'pk_ecosy_1': 'TextEdit', 'ecosyst_ev': 'TextEdit', 'ecosyst__2': 'TextEdit', 'pk_ses_eva': 'TextEdit', 'ses_eval': 'TextEdit', 'ses_eval_e': 'TextEdit', 'mortality': 'TextEdit', 'pk_user': 'Range', 'firstname': 'TextEdit', 'lastname': 'TextEdit', 'date_creat': 'TextEdit', 'date_modif': 'TextEdit', 'geom_pop': 'TextEdit', 'pop_protec': 'TextEdit', });
lyr_plantcountries_2.set('fieldImages', {'pk_populat': 'Range', 'pop_cod': 'TextEdit', 'country_po': 'TextEdit', 'pk_species': 'Range', 'kingdom': 'TextEdit', 'genus': 'TextEdit', 'species': 'TextEdit', 'subspecies': 'TextEdit', 'metapop': 'TextEdit', 'community': 'TextEdit', 'pk_init_in': 'TextEdit', 'init_info': 'TextEdit', 'init_info_': 'TextEdit', 'publicatio': 'TextEdit', 'last_admin': 'TextEdit', 'most_recen': 'TextEdit', 'potentials': 'TextEdit', 'general_re': 'TextEdit', 'pk_reason': 'TextEdit', 'reason': 'TextEdit', 'reason_en': 'TextEdit', 'justif_det': 'TextEdit', 'extinct_yr': 'TextEdit', 'extinct__1': 'TextEdit', 'pk_rescue': 'TextEdit', 'rescue': 'TextEdit', 'rescue_en': 'TextEdit', 'objectives': 'TextEdit', 'context_re': 'TextEdit', 'pk_translo': 'TextEdit', 'transloc': 'TextEdit', 'transloc_e': 'TextEdit', 'pk_altern': 'TextEdit', 'altern': 'TextEdit', 'altern_en': 'TextEdit', 'pk_reinfor': 'TextEdit', 'reinfor': 'TextEdit', 'reinfor_en': 'TextEdit', 'pk_clust': 'TextEdit', 'clust': 'TextEdit', 'clust_en': 'TextEdit', 'pk_separat': 'TextEdit', 'separation': 'TextEdit', 'separati_1': 'TextEdit', 'first_rele': 'Range', 'precision_': 'TextEdit', 'last_relea': 'TextEdit', 'precisio_1': 'TextEdit', 'pk_phase': 'TextEdit', 'phase': 'TextEdit', 'phase_en': 'TextEdit', 'fk_multisi': 'TextEdit', 'fk_multi_s': 'TextEdit', 'typ_rem': 'TextEdit', 'lat_pop': 'TextEdit', 'long_pop': 'TextEdit', 'lieu_dit': 'TextEdit', 'loc_rem': 'TextEdit', 'dist': 'TextEdit', 'pk_origin': 'TextEdit', 'origin': 'TextEdit', 'origin_en': 'TextEdit', 'pk_connex': 'TextEdit', 'connex': 'TextEdit', 'connex_en': 'TextEdit', 'isol_caus': 'TextEdit', 'pop_hab': 'TextEdit', 'pk_protec_': 'TextEdit', 'protec_fir': 'TextEdit', 'protec_f_1': 'TextEdit', 'pk_prote_1': 'TextEdit', 'protec_las': 'TextEdit', 'protec_l_1': 'TextEdit', 'pk_prote_2': 'TextEdit', 'protec_csq': 'TextEdit', 'protec_c_1': 'TextEdit', 'sit_rem': 'TextEdit', 'pk_legal_p': 'TextEdit', 'legal_prot': 'TextEdit', 'legal_pr_1': 'TextEdit', 'pk_div_sta': 'TextEdit', 'div_stag': 'TextEdit', 'div_stag_e': 'TextEdit', 'pk_birth': 'TextEdit', 'birth': 'TextEdit', 'birth_en': 'TextEdit', 'pk_div_ori': 'TextEdit', 'div_orig': 'TextEdit', 'div_orig_e': 'TextEdit', 'biol_rem': 'TextEdit', 'pk_prep_ha': 'TextEdit', 'prep_hab': 'TextEdit', 'prep_hab_e': 'TextEdit', 'time_exsit': 'TextEdit', 'pk_stage_c': 'TextEdit', 'stage_chan': 'TextEdit', 'stage_ch_1': 'TextEdit', 'pk_gen_pro': 'TextEdit', 'gen_prog': 'TextEdit', 'gen_prog_e': 'TextEdit', 'pk_increas': 'TextEdit', 'increase': 'TextEdit', 'increase_e': 'TextEdit', 'increase_m': 'TextEdit', 'pk_env_con': 'TextEdit', 'env_condit': 'TextEdit', 'env_cond_1': 'TextEdit', 'pk_sub_pop': 'TextEdit', 'sub_pops': 'TextEdit', 'sub_pops_e': 'TextEdit', 'pk_tech_de': 'TextEdit', 'tech_det': 'TextEdit', 'tech_det_e': 'TextEdit', 'pk_temp_sp': 'TextEdit', 'temp_sprea': 'TextEdit', 'temp_spr_1': 'TextEdit', 'nb_release': 'TextEdit', 'tot_nb': 'TextEdit', 'meth_rem': 'TextEdit', 'obs_max': 'TextEdit', 'pk_pop_abu': 'TextEdit', 'pop_abunda': 'TextEdit', 'pop_abun_1': 'TextEdit', 'pk_time_se': 'TextEdit', 'time_serie': 'TextEdit', 'time_ser_1': 'TextEdit', 'pk_founder': 'TextEdit', 'founder_de': 'TextEdit', 'founder__1': 'TextEdit', 'pk_descend': 'TextEdit', 'descend_de': 'TextEdit', 'descend__1': 'TextEdit', 'pk_pva': 'TextEdit', 'pva': 'TextEdit', 'pva_en': 'TextEdit', 'monit_rem': 'TextEdit', 'pk_found_1': 'TextEdit', 'founder_re': 'TextEdit', 'founder__2': 'TextEdit', 'pk_desce_1': 'TextEdit', 'descend_re': 'TextEdit', 'descend__2': 'TextEdit', 'pk_dispers': 'TextEdit', 'dispersal': 'TextEdit', 'dispersal_': 'TextEdit', 'pk_ecosyst': 'TextEdit', 'ecosyst_cs': 'TextEdit', 'ecosyst__1': 'TextEdit', 'pk_ses_csq': 'TextEdit', 'ses_csq': 'TextEdit', 'ses_csq_en': 'TextEdit', 'det_csq': 'TextEdit', 'res_rem': 'TextEdit', 'pk_pop_eva': 'TextEdit', 'pop_eval': 'TextEdit', 'pop_eval_e': 'TextEdit', 'pk_experim': 'TextEdit', 'experim_ev': 'TextEdit', 'experim__1': 'TextEdit', 'pk_ecosy_1': 'TextEdit', 'ecosyst_ev': 'TextEdit', 'ecosyst__2': 'TextEdit', 'pk_ses_eva': 'TextEdit', 'ses_eval': 'TextEdit', 'ses_eval_e': 'TextEdit', 'mortality': 'TextEdit', 'pk_user': 'Range', 'firstname': 'TextEdit', 'lastname': 'TextEdit', 'date_creat': 'TextEdit', 'date_modif': 'TextEdit', 'geom_pop': 'TextEdit', 'pop_protec': 'TextEdit', });
lyr_plantcountries_species_1.set('fieldLabels', {'pk_populat': 'no label', 'pop_cod': 'no label', 'country_po': 'no label', 'pk_species': 'no label', 'kingdom': 'no label', 'genus': 'no label', 'species': 'no label', 'subspecies': 'no label', 'metapop': 'no label', 'community': 'no label', 'pk_init_in': 'no label', 'init_info': 'no label', 'init_info_': 'no label', 'publicatio': 'no label', 'last_admin': 'no label', 'most_recen': 'no label', 'potentials': 'no label', 'general_re': 'no label', 'pk_reason': 'no label', 'reason': 'no label', 'reason_en': 'no label', 'justif_det': 'no label', 'extinct_yr': 'no label', 'extinct__1': 'no label', 'pk_rescue': 'no label', 'rescue': 'no label', 'rescue_en': 'no label', 'objectives': 'no label', 'context_re': 'no label', 'pk_translo': 'no label', 'transloc': 'no label', 'transloc_e': 'no label', 'pk_altern': 'no label', 'altern': 'no label', 'altern_en': 'no label', 'pk_reinfor': 'no label', 'reinfor': 'no label', 'reinfor_en': 'no label', 'pk_clust': 'no label', 'clust': 'no label', 'clust_en': 'no label', 'pk_separat': 'no label', 'separation': 'no label', 'separati_1': 'no label', 'first_rele': 'no label', 'precision_': 'no label', 'last_relea': 'no label', 'precisio_1': 'no label', 'pk_phase': 'no label', 'phase': 'no label', 'phase_en': 'no label', 'fk_multisi': 'no label', 'fk_multi_s': 'no label', 'typ_rem': 'no label', 'lat_pop': 'no label', 'long_pop': 'no label', 'lieu_dit': 'no label', 'loc_rem': 'no label', 'dist': 'no label', 'pk_origin': 'no label', 'origin': 'no label', 'origin_en': 'no label', 'pk_connex': 'no label', 'connex': 'no label', 'connex_en': 'no label', 'isol_caus': 'no label', 'pop_hab': 'no label', 'pk_protec_': 'no label', 'protec_fir': 'no label', 'protec_f_1': 'no label', 'pk_prote_1': 'no label', 'protec_las': 'no label', 'protec_l_1': 'no label', 'pk_prote_2': 'no label', 'protec_csq': 'no label', 'protec_c_1': 'no label', 'sit_rem': 'no label', 'pk_legal_p': 'no label', 'legal_prot': 'no label', 'legal_pr_1': 'no label', 'pk_div_sta': 'no label', 'div_stag': 'no label', 'div_stag_e': 'no label', 'pk_birth': 'no label', 'birth': 'no label', 'birth_en': 'no label', 'pk_div_ori': 'no label', 'div_orig': 'no label', 'div_orig_e': 'no label', 'biol_rem': 'no label', 'pk_prep_ha': 'no label', 'prep_hab': 'no label', 'prep_hab_e': 'no label', 'time_exsit': 'no label', 'pk_stage_c': 'no label', 'stage_chan': 'no label', 'stage_ch_1': 'no label', 'pk_gen_pro': 'no label', 'gen_prog': 'no label', 'gen_prog_e': 'no label', 'pk_increas': 'no label', 'increase': 'no label', 'increase_e': 'no label', 'increase_m': 'no label', 'pk_env_con': 'no label', 'env_condit': 'no label', 'env_cond_1': 'no label', 'pk_sub_pop': 'no label', 'sub_pops': 'no label', 'sub_pops_e': 'no label', 'pk_tech_de': 'no label', 'tech_det': 'no label', 'tech_det_e': 'no label', 'pk_temp_sp': 'no label', 'temp_sprea': 'no label', 'temp_spr_1': 'no label', 'nb_release': 'no label', 'tot_nb': 'no label', 'meth_rem': 'no label', 'obs_max': 'no label', 'pk_pop_abu': 'no label', 'pop_abunda': 'no label', 'pop_abun_1': 'no label', 'pk_time_se': 'no label', 'time_serie': 'no label', 'time_ser_1': 'no label', 'pk_founder': 'no label', 'founder_de': 'no label', 'founder__1': 'no label', 'pk_descend': 'no label', 'descend_de': 'no label', 'descend__1': 'no label', 'pk_pva': 'no label', 'pva': 'no label', 'pva_en': 'no label', 'monit_rem': 'no label', 'pk_found_1': 'no label', 'founder_re': 'no label', 'founder__2': 'no label', 'pk_desce_1': 'no label', 'descend_re': 'no label', 'descend__2': 'no label', 'pk_dispers': 'no label', 'dispersal': 'no label', 'dispersal_': 'no label', 'pk_ecosyst': 'no label', 'ecosyst_cs': 'no label', 'ecosyst__1': 'no label', 'pk_ses_csq': 'no label', 'ses_csq': 'no label', 'ses_csq_en': 'no label', 'det_csq': 'no label', 'res_rem': 'no label', 'pk_pop_eva': 'no label', 'pop_eval': 'no label', 'pop_eval_e': 'no label', 'pk_experim': 'no label', 'experim_ev': 'no label', 'experim__1': 'no label', 'pk_ecosy_1': 'no label', 'ecosyst_ev': 'no label', 'ecosyst__2': 'no label', 'pk_ses_eva': 'no label', 'ses_eval': 'no label', 'ses_eval_e': 'no label', 'mortality': 'no label', 'pk_user': 'no label', 'firstname': 'no label', 'lastname': 'no label', 'date_creat': 'no label', 'date_modif': 'no label', 'geom_pop': 'no label', 'pop_protec': 'no label', });
lyr_plantcountries_2.set('fieldLabels', {'pk_populat': 'no label', 'pop_cod': 'no label', 'country_po': 'no label', 'pk_species': 'no label', 'kingdom': 'no label', 'genus': 'no label', 'species': 'no label', 'subspecies': 'no label', 'metapop': 'no label', 'community': 'no label', 'pk_init_in': 'no label', 'init_info': 'no label', 'init_info_': 'no label', 'publicatio': 'no label', 'last_admin': 'no label', 'most_recen': 'no label', 'potentials': 'no label', 'general_re': 'no label', 'pk_reason': 'no label', 'reason': 'no label', 'reason_en': 'no label', 'justif_det': 'no label', 'extinct_yr': 'no label', 'extinct__1': 'no label', 'pk_rescue': 'no label', 'rescue': 'no label', 'rescue_en': 'no label', 'objectives': 'no label', 'context_re': 'no label', 'pk_translo': 'no label', 'transloc': 'no label', 'transloc_e': 'no label', 'pk_altern': 'no label', 'altern': 'no label', 'altern_en': 'no label', 'pk_reinfor': 'no label', 'reinfor': 'no label', 'reinfor_en': 'no label', 'pk_clust': 'no label', 'clust': 'no label', 'clust_en': 'no label', 'pk_separat': 'no label', 'separation': 'no label', 'separati_1': 'no label', 'first_rele': 'no label', 'precision_': 'no label', 'last_relea': 'no label', 'precisio_1': 'no label', 'pk_phase': 'no label', 'phase': 'no label', 'phase_en': 'no label', 'fk_multisi': 'no label', 'fk_multi_s': 'no label', 'typ_rem': 'no label', 'lat_pop': 'no label', 'long_pop': 'no label', 'lieu_dit': 'no label', 'loc_rem': 'no label', 'dist': 'no label', 'pk_origin': 'no label', 'origin': 'no label', 'origin_en': 'no label', 'pk_connex': 'no label', 'connex': 'no label', 'connex_en': 'no label', 'isol_caus': 'no label', 'pop_hab': 'no label', 'pk_protec_': 'no label', 'protec_fir': 'no label', 'protec_f_1': 'no label', 'pk_prote_1': 'no label', 'protec_las': 'no label', 'protec_l_1': 'no label', 'pk_prote_2': 'no label', 'protec_csq': 'no label', 'protec_c_1': 'no label', 'sit_rem': 'no label', 'pk_legal_p': 'no label', 'legal_prot': 'no label', 'legal_pr_1': 'no label', 'pk_div_sta': 'no label', 'div_stag': 'no label', 'div_stag_e': 'no label', 'pk_birth': 'no label', 'birth': 'no label', 'birth_en': 'no label', 'pk_div_ori': 'no label', 'div_orig': 'no label', 'div_orig_e': 'no label', 'biol_rem': 'no label', 'pk_prep_ha': 'no label', 'prep_hab': 'no label', 'prep_hab_e': 'no label', 'time_exsit': 'no label', 'pk_stage_c': 'no label', 'stage_chan': 'no label', 'stage_ch_1': 'no label', 'pk_gen_pro': 'no label', 'gen_prog': 'no label', 'gen_prog_e': 'no label', 'pk_increas': 'no label', 'increase': 'no label', 'increase_e': 'no label', 'increase_m': 'no label', 'pk_env_con': 'no label', 'env_condit': 'no label', 'env_cond_1': 'no label', 'pk_sub_pop': 'no label', 'sub_pops': 'no label', 'sub_pops_e': 'no label', 'pk_tech_de': 'no label', 'tech_det': 'no label', 'tech_det_e': 'no label', 'pk_temp_sp': 'no label', 'temp_sprea': 'no label', 'temp_spr_1': 'no label', 'nb_release': 'no label', 'tot_nb': 'no label', 'meth_rem': 'no label', 'obs_max': 'no label', 'pk_pop_abu': 'no label', 'pop_abunda': 'no label', 'pop_abun_1': 'no label', 'pk_time_se': 'no label', 'time_serie': 'no label', 'time_ser_1': 'no label', 'pk_founder': 'no label', 'founder_de': 'no label', 'founder__1': 'no label', 'pk_descend': 'no label', 'descend_de': 'no label', 'descend__1': 'no label', 'pk_pva': 'no label', 'pva': 'no label', 'pva_en': 'no label', 'monit_rem': 'no label', 'pk_found_1': 'no label', 'founder_re': 'no label', 'founder__2': 'no label', 'pk_desce_1': 'no label', 'descend_re': 'no label', 'descend__2': 'no label', 'pk_dispers': 'no label', 'dispersal': 'no label', 'dispersal_': 'no label', 'pk_ecosyst': 'no label', 'ecosyst_cs': 'no label', 'ecosyst__1': 'no label', 'pk_ses_csq': 'no label', 'ses_csq': 'no label', 'ses_csq_en': 'no label', 'det_csq': 'no label', 'res_rem': 'no label', 'pk_pop_eva': 'no label', 'pop_eval': 'no label', 'pop_eval_e': 'no label', 'pk_experim': 'no label', 'experim_ev': 'no label', 'experim__1': 'no label', 'pk_ecosy_1': 'no label', 'ecosyst_ev': 'no label', 'ecosyst__2': 'no label', 'pk_ses_eva': 'no label', 'ses_eval': 'no label', 'ses_eval_e': 'no label', 'mortality': 'no label', 'pk_user': 'no label', 'firstname': 'no label', 'lastname': 'no label', 'date_creat': 'no label', 'date_modif': 'no label', 'geom_pop': 'no label', 'pop_protec': 'no label', });
lyr_plantcountries_2.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});